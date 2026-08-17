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
import mimetypes
import socket
import ssl
import urllib.parse
import urllib.request
import uuid

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


def _request(method, path, timeout, body=None, content_type="application/json"):
    last_error = None
    for target in KNOWN_GOOD_IPS + [TELEGRAM_HOST]:
        conn = None
        try:
            conn = _connect(target, timeout)
            headers = {"Host": TELEGRAM_HOST}
            if body is not None:
                headers["Content-Type"] = content_type
            conn.request(method, path, body=body, headers=headers)
            resp = conn.getresponse()
            return resp.status, resp.read()
        except Exception as e:
            last_error = f"{target}: {e}"
        finally:
            if conn is not None:
                conn.close()
    raise RuntimeError(last_error or "unknown error")


def _call(bot_token, method, payload_dict, timeout=10):
    path = f"/bot{bot_token}/{method}"
    payload = json.dumps(payload_dict).encode()
    status, body = _request("POST", path, timeout, body=payload)
    parsed = json.loads(body)
    if 200 <= status < 300:
        return parsed.get("ok", False), json.dumps(parsed)
    return False, json.dumps(parsed)


def _build_multipart(fields, file_field, filename, file_bytes):
    boundary = uuid.uuid4().hex
    content_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"
    parts = []
    for name, value in fields.items():
        parts.append(
            f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"\r\n\r\n{value}\r\n".encode()
        )
    parts.append(
        (
            f"--{boundary}\r\nContent-Disposition: form-data; name=\"{file_field}\"; filename=\"{filename}\"\r\n"
            f"Content-Type: {content_type}\r\n\r\n"
        ).encode()
        + file_bytes
        + b"\r\n"
    )
    parts.append(f"--{boundary}--\r\n".encode())
    return b"".join(parts), f"multipart/form-data; boundary={boundary}"


def _call_multipart(bot_token, method, fields, file_field, filename, file_bytes, timeout=20):
    path = f"/bot{bot_token}/{method}"
    body, content_type = _build_multipart(fields, file_field, filename, file_bytes)
    status, resp_body = _request("POST", path, timeout, body=body, content_type=content_type)
    parsed = json.loads(resp_body)
    if 200 <= status < 300:
        return parsed.get("ok", False), json.dumps(parsed)
    return False, json.dumps(parsed)


def send_message(bot_token, chat_id, text):
    return _call(bot_token, "sendMessage", {"chat_id": chat_id, "text": text, "parse_mode": "HTML"})


# Telegram caption limit is 1024 chars — outbox summaries can run longer,
# so these take an optional caption and let the caller (publish_outbox_item)
# decide whether it fits or needs a separate follow-up send_message().
#
# sendPhoto is given the raw file bytes (multipart upload), not the URL.
# Passing a URL makes Telegram's own servers fetch it, and that fetch path
# repeatedly rejected valid, correctly-typed PNGs hosted on
# raw.githubusercontent.com with "wrong type of the web page content" —
# even a brand-new, never-before-seen image failed identically, which ruled
# out the image content and pointed at Telegram's URL-fetch/preview
# mechanism itself. Downloading the bytes ourselves and uploading them
# directly sidesteps that fetch path entirely.
def send_photo(bot_token, chat_id, photo_url, caption=None):
    payload = {"chat_id": chat_id}
    if caption:
        payload["caption"] = caption
        payload["parse_mode"] = "HTML"

    try:
        with urllib.request.urlopen(photo_url, timeout=20) as resp:
            image_bytes = resp.read()
    except Exception as e:
        return False, json.dumps({"ok": False, "error": f"failed to download photo_url: {e}"})

    filename = urllib.parse.urlparse(photo_url).path.rsplit("/", 1)[-1] or "photo.png"
    return _call_multipart(bot_token, "sendPhoto", payload, "photo", filename, image_bytes)


TELEGRAM_CAPTION_LIMIT = 1024


def publish_outbox_item(bot_token, chat_id, text, image_url=None):
    """Send one commands/outbox/*.json item, with an optional 'image'
    preview — this is how draft cover images reach the user for approval
    before anything is published, mirroring the same image-handling
    pattern used by the SINOTECH/AURA content pipelines."""
    if not image_url:
        return send_message(bot_token, chat_id, text)

    caption = text if text and len(text) <= TELEGRAM_CAPTION_LIMIT else None
    ok, detail = send_photo(bot_token, chat_id, image_url, caption)
    if ok and text and caption is None:
        return send_message(bot_token, chat_id, text)
    return ok, detail


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
