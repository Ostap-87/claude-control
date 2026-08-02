"""Shared Telegram helper: pinned-IP GET/POST (see comment below) plus
get_updates (long polling) and send_message.

The VPS's DNS/routing intermittently fails to reach some of Telegram's
IPs while others work fine (diagnosed while setting up the same
mechanism for globaltechtour.ru and aura-robotics.ru on this same VPS).
Connecting straight to a verified IP sidesteps that: the TLS handshake
still verifies against the real hostname (SNI + cert check), and the
Host header is still the real domain, only the TCP destination is
pinned — the same trick as `curl --resolve`. Falls back to normal DNS
resolution in case this specific IP stops working later.
"""
import http.client
import json
import socket
import ssl
import urllib.parse

TELEGRAM_HOST = "api.telegram.org"
KNOWN_GOOD_IPS = ["149.154.167.220"]


def _connect(connect_target, timeout):
    context = ssl.create_default_context()
    if connect_target == TELEGRAM_HOST:
        return http.client.HTTPSConnection(TELEGRAM_HOST, timeout=timeout, context=context)
    raw_sock = socket.create_connection((connect_target, 443), timeout=timeout)
    sock = context.wrap_socket(raw_sock, server_hostname=TELEGRAM_HOST)
    conn = http.client.HTTPSConnection(TELEGRAM_HOST, timeout=timeout)
    conn.sock = sock
    return conn


def _request(method, path, timeout, body=None):
    last_error = None
    for target in KNOWN_GOOD_IPS + [TELEGRAM_HOST]:
        conn = None
        try:
            conn = _connect(target, timeout)
            headers = {"Host": TELEGRAM_HOST}
            if body is not None:
                headers["Content-Type"] = "application/json"
            conn.request(method, path, body=body, headers=headers)
            resp = conn.getresponse()
            return resp.status, resp.read()
        except Exception as e:
            last_error = f"{target}: {e}"
        finally:
            if conn is not None:
                conn.close()
    raise RuntimeError(last_error or "unknown error")


def send_message(bot_token, chat_id, text):
    path = f"/bot{bot_token}/sendMessage"
    payload = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    status, body = _request("POST", path, 10, body=payload)
    parsed = json.loads(body)
    if 200 <= status < 300:
        return parsed.get("ok", False), json.dumps(parsed)
    return False, json.dumps(parsed)


def get_updates(bot_token, offset=None, timeout=25):
    params = {"timeout": timeout}
    if offset is not None:
        params["offset"] = offset
    path = f"/bot{bot_token}/getUpdates?{urllib.parse.urlencode(params)}"
    # network timeout has to exceed Telegram's long-poll timeout, or we'd
    # cut the connection before Telegram has a chance to reply
    status, body = _request("GET", path, timeout + 10)
    parsed = json.loads(body)
    if not parsed.get("ok"):
        raise RuntimeError(f"getUpdates failed: {parsed}")
    return parsed.get("result", [])
