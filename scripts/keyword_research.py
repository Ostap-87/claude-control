#!/usr/bin/env python3
"""Автоматический сбор ключевых слов без платных API — для трёх сайтов
(aura-robotics.ru, globaltechtour.ru, ostapdotcenko.ru), каждый со своим
ядром seed-фраз.

Источники, в порядке приоритета для каждого seed-запроса:
  1. Google Suggest   — suggestqueries.google.com/complete/search (бесплатный, без ключа)
  2. Яндекс.Подсказки  — yandex.ru/suggest/suggest-ya.cgi (бесплатный, без ключа)
  3. Google Trends     — через pytrends (бесплатная библиотека-обёртка)
  4. DuckDuckGo HTML    — html.duckduckgo.com/html (фолбэк без ключа, если 1-2 недоступны)

Каждый источник обёрнут в try/except с таймаутом — падение одного
источника (лимит, таймаут, бан по IP) не останавливает сбор: скрипт
просто помечает источник как недоступный для этого запроса и идёт
дальше, по остальным источникам и остальным seed-фразам.

ВАЖНО: сеть нужна настоящая — с окружений, где исходящий трафик режется
прокси-политикой (например, некоторые песочницы Claude Code), Google
Suggest/Яндекс/Trends не ответят вообще ни на один запрос (соединение
рвётся на этапе TCP/TLS, а не по таймауту) — это не баг скрипта.
Обычный ноутбук/VPS с прямым интернетом отработает штатно.

Использование:
    python3 keyword_research.py --test              # 2-3 сида на сайт, быстрая проверка
    python3 keyword_research.py                      # полный прогон по всем сидам
    python3 keyword_research.py --output out.xlsx     # свой путь для результата
"""
from __future__ import annotations

import argparse
import sys
import time
import urllib.parse
from dataclasses import dataclass, field

import pandas as pd
import requests

# --------------------------------------------------------------------------
# Seed-ядра по сайтам — точка входа для расширения семантики каждого сайта
# --------------------------------------------------------------------------

SEED_KEYWORDS: dict[str, list[str]] = {
    "aura-robotics.ru": [
        "промышленные роботы купить",
        "робот манипулятор цена",
        "гуманоидные роботы Китай",
        "поставка роботов из Китая",
        "автоматизация производства роботами",
        "сварочный робот купить",
        "кобот для производства",
        "складской робот AGV",
        "робот паллетайзер",
        "промышленная робототехника Китай",
        "роботизация производства цена",
        "заказать робота с завода Китай",
        "купить робота манипулятор Китай",
        "робот для сварки металла",
        "складская роботизация склад",
        "человекоподобный робот купить",
        "робот для покраски",
        "коллаборативный робот кобот цена",
        "автоматизация конвейера робот",
        "подбор промышленного робота под задачу",
    ],
    "globaltechtour.ru": [
        "бизнес тур в Китай",
        "деловая поездка в Китай для предпринимателей",
        "бенчмаркинг тур Китай",
        "экскурсия на завод в Китае",
        "индустриальный туризм Китай",
        "деловые делегации в Китай",
        "поездка на выставку в Китай",
        "изучение бизнеса в Китае тур",
        "посещение заводов Китай для бизнеса",
        "технологический тур в Китай",
        "поездка в Шэньчжэнь для бизнеса",
        "бизнес миссия в Китай",
        "обучающая поездка в Китай",
        "деловой туризм Азия",
        "тур по технологическим компаниям Китая",
        "выставка электроники Китай тур",
        "командировка в Китай для закупки",
        "бизнес тур Юго-Восточная Азия",
        "поездка к производителям Китай",
        "изучение опыта китайских компаний",
    ],
    "ostapdotcenko.ru": [
        "эксперт по Китаю",
        "консультант по ВЭД с Китаем",
        "как начать бизнес с Китаем",
        "поиск поставщика в Китае",
        "как закупать в Китае",
        "эксперт по робототехнике",
        "блог про Китай для бизнеса",
        "ведение бизнеса с Китаем",
        "консультация по закупкам в Китае",
        "как работать с китайскими заводами",
        "ВЭД с Китаем с нуля",
        "импорт из Китая для бизнеса",
        "блог про робототехнику Китай",
        "поиск завода производителя в Китае",
        "как выбрать поставщика в Китае",
        "эксперт по внешнеэкономической деятельности",
        "бизнес консультант Китай",
        "блог предпринимателя про Китай",
        "переговоры с китайскими поставщиками",
        "личный бренд эксперт по Китаю",
    ],
}

REQUEST_TIMEOUT = 8
RETRIES = 2
DELAY_BETWEEN_REQUESTS = 1.2  # секунды — не долбить бесплатные эндпойнты слишком часто
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


@dataclass
class Row:
    query: str
    source: str
    related: list[str] = field(default_factory=list)
    trend: str = ""


def _retry(fn, *args, retries: int = RETRIES, **kwargs):
    """Вызывает fn с повторами; любая ошибка гасится, возвращает None если все попытки упали."""
    last_err = None
    for attempt in range(retries + 1):
        try:
            return fn(*args, **kwargs)
        except Exception as e:  # noqa: BLE001 — нам нужно поймать вообще всё: сеть, таймаут, JSON, бан
            last_err = e
            if attempt < retries:
                time.sleep(0.6 * (attempt + 1))
    print(f"  [!] {fn.__name__}({args[:1]}) не сработал после {retries + 1} попыток: {last_err}", file=sys.stderr)
    return None


# --------------------------------------------------------------------------
# Источник 1: Google Suggest
# --------------------------------------------------------------------------

def google_suggest(query: str) -> list[str]:
    url = "https://suggestqueries.google.com/complete/search"
    params = {"client": "firefox", "hl": "ru", "gl": "ru", "q": query}
    r = requests.get(url, params=params, timeout=REQUEST_TIMEOUT, headers={"User-Agent": UA})
    r.raise_for_status()
    data = r.json()
    suggestions = data[1] if len(data) > 1 else []
    return [s for s in suggestions if isinstance(s, str) and s.strip().lower() != query.strip().lower()]


# --------------------------------------------------------------------------
# Источник 2: Яндекс.Подсказки
# --------------------------------------------------------------------------

def yandex_suggest(query: str) -> list[str]:
    url = "https://yandex.ru/suggest/suggest-ya.cgi"
    params = {"part": query, "uil": "ru", "v": 4, "sn": 10}
    r = requests.get(url, params=params, timeout=REQUEST_TIMEOUT, headers={"User-Agent": UA})
    r.raise_for_status()
    data = r.json()
    suggestions = data[1] if len(data) > 1 else []
    out = []
    for item in suggestions:
        text = item[0] if isinstance(item, list) else item
        if isinstance(text, str) and text.strip().lower() != query.strip().lower():
            out.append(text)
    return out


# --------------------------------------------------------------------------
# Источник 3: Google Trends (pytrends)
# --------------------------------------------------------------------------

def google_trends_summary(query: str) -> tuple[str, list[str]]:
    """Возвращает (текстовое описание динамики, related queries) для одного запроса."""
    from pytrends.request import TrendReq

    pytrends = TrendReq(hl="ru-RU", tz=180)
    pytrends.build_payload([query], timeframe="today 3-m", geo="RU")

    trend_desc = ""
    iot = pytrends.interest_over_time()
    if iot is not None and not iot.empty and query in iot.columns:
        series = iot[query]
        first, last = series.iloc[0], series.iloc[-1]
        avg = round(series.mean(), 1)
        if last > first * 1.15:
            direction = "растёт"
        elif last < first * 0.85:
            direction = "падает"
        else:
            direction = "стабильно"
        trend_desc = f"{direction} (интерес {first}→{last}, среднее {avg} за 3 мес.)"

    related_terms: list[str] = []
    related = pytrends.related_queries()
    block = related.get(query) if related else None
    if block:
        for key in ("top", "rising"):
            df = block.get(key)
            if df is not None and not df.empty:
                related_terms.extend(df["query"].head(8).tolist())

    return trend_desc, list(dict.fromkeys(related_terms))  # убираем дубли, сохраняя порядок


# --------------------------------------------------------------------------
# Источник 4 (фолбэк): DuckDuckGo HTML — без ключа, не режется большинством политик
# --------------------------------------------------------------------------

def duckduckgo_related(query: str) -> list[str]:
    """Лёгкий разбор страницы результатов DuckDuckGo HTML-версии: вытягивает
    заголовки выдачи как приближение к 'похожим запросам' — сама DDG не
    отдаёт related-queries отдельным API, поэтому это самый грубый источник
    из четырёх и используется только когда первые три недоступны."""
    url = "https://html.duckduckgo.com/html/"
    r = requests.post(url, data={"q": query}, timeout=REQUEST_TIMEOUT, headers={"User-Agent": UA})
    r.raise_for_status()
    import re

    titles = re.findall(r'class="result__a"[^>]*>(.*?)</a>', r.text, flags=re.S)
    clean = [re.sub(r"<[^>]+>", "", t).strip() for t in titles]
    return [t for t in clean if t][:8]


# --------------------------------------------------------------------------
# Firecrawl (опционально) — доступен только когда его MCP-инструмент под
# рукой у агента Claude в этой сессии; отдельный python-процесс до него
# напрямую не достучится. Если у вас есть свой FIRECRAWL_API_KEY, можно
# включить REST-вызов ниже (закомментирован) — Firecrawl даёт бесплатный
# стартовый лимит кредитов, платный API не обязателен для пробы.
# --------------------------------------------------------------------------

def firecrawl_related(query: str, site: str) -> list[str] | None:
    import os

    api_key = os.environ.get("FIRECRAWL_API_KEY")
    if not api_key:
        return None  # источник просто пропускается, это не ошибка
    try:
        r = requests.post(
            "https://api.firecrawl.dev/v1/search",
            headers={"Authorization": f"Bearer {api_key}"},
            json={"query": f"site:{site} {query}", "limit": 8},
            timeout=REQUEST_TIMEOUT,
        )
        r.raise_for_status()
        data = r.json()
        return [item.get("title", "") for item in data.get("data", []) if item.get("title")]
    except Exception as e:  # noqa: BLE001
        print(f"  [!] firecrawl_related упал: {e}", file=sys.stderr)
        return None


# --------------------------------------------------------------------------
# Сбор по одному сайту
# --------------------------------------------------------------------------

def collect_for_site(site: str, seeds: list[str]) -> list[Row]:
    rows: list[Row] = []

    for seed in seeds:
        print(f"[{site}] seed: {seed}")
        row_added = False

        gs = _retry(google_suggest, seed)
        if gs:
            rows.append(Row(query=seed, source="Google Suggest", related=gs))
            row_added = True
        time.sleep(DELAY_BETWEEN_REQUESTS)

        ys = _retry(yandex_suggest, seed)
        if ys:
            rows.append(Row(query=seed, source="Яндекс", related=ys))
            row_added = True
        time.sleep(DELAY_BETWEEN_REQUESTS)

        trends_result = _retry(google_trends_summary, seed, retries=1)
        if trends_result:
            trend_desc, related_terms = trends_result
            rows.append(Row(query=seed, source="Google Trends", related=related_terms, trend=trend_desc))
            row_added = True
        time.sleep(DELAY_BETWEEN_REQUESTS)

        fc = firecrawl_related(seed, site)
        if fc:
            rows.append(Row(query=seed, source="Firecrawl", related=fc))
            row_added = True

        # Фолбэк — включаем DuckDuckGo, только если ни один из основных
        # источников не дал результата по этому seed-запросу.
        if not row_added:
            ddg = _retry(duckduckgo_related, seed)
            if ddg:
                rows.append(Row(query=seed, source="web_search (DuckDuckGo)", related=ddg))
            else:
                rows.append(Row(query=seed, source="—", related=[], trend="все источники недоступны"))

    return rows


# --------------------------------------------------------------------------
# Экспорт в xlsx — по листу на сайт
# --------------------------------------------------------------------------

def export_xlsx(results: dict[str, list[Row]], output_path: str) -> None:
    with pd.ExcelWriter(output_path, engine="openpyxl") as writer:
        for site, rows in results.items():
            df = pd.DataFrame(
                [
                    {
                        "запрос": r.query,
                        "источник": r.source,
                        "related-запросы": "; ".join(r.related),
                        "динамика Trends": r.trend,
                    }
                    for r in rows
                ]
            )
            sheet_name = site.replace(".ru", "")[:31]  # лимит Excel на длину имени листа
            df.to_excel(writer, sheet_name=sheet_name, index=False)
    print(f"\nГотово: {output_path}")


# --------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--test", action="store_true", help="только 3 seed-фразы на сайт, для быстрой проверки")
    parser.add_argument("--output", default="keyword_research.xlsx", help="путь к результирующему xlsx")
    args = parser.parse_args()

    results: dict[str, list[Row]] = {}
    for site, seeds in SEED_KEYWORDS.items():
        active_seeds = seeds[:3] if args.test else seeds
        results[site] = collect_for_site(site, active_seeds)

    export_xlsx(results, args.output)


if __name__ == "__main__":
    main()
