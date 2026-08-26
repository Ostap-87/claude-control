# Aura Robotics — Telegram batch continuation (2026-09-05 → 2026-09-07)

## ⚠️ Blocking finding — read before using this file

`aura-tg-month.md` and `20-day-batch.md` between them have already turned **every one of the 50 factories in `factories.csv`** into a dedicated post or article (verified by direct cross-check of `factories.csv` ids against `aura-blog-15day-batch.json` slugs, `aura/content/blog/*.json`, and every "Aura Robotics — <company>" heading in `20-day-batch.md` — the full id list and the match is below). Per editorial policy, Aura content must come from the real catalog (`factories.csv`/`models.csv`) and must not repeat a company already covered. With the factory pool fully exhausted, a genuinely new 60-topic, 30-day batch **cannot be produced from current data without either repeating a company or inventing one** — the second option is a hard line this task will not cross.

**Factories used across blog+TG (all 50, i.e. the entire file):** evst, huayan, estun, efort, step, jaka, dobot, kunrobot, geekplus, seer, senad, pudu, orionstar, deeprobotics, matrixrobotics, droidup, robotera, agibot, ubtech, fourier, zerith, daxrobotics, qio, robbyant, kepler, leju, limx, engineai, xhumanoid, pndbotics, galbot, whalesbot, linkerbot, yanc, xiangying, xixiang, bzl, borunte, fangshi, brainco, moonshot, leying, mayekawa, foodmate, raniche, eruis, easyweigh, coso, shigan, noetix.

**What this file does instead (a deliberate, disclosed compromise, not a silent workaround):** 6 posts (3 days × 2 slots) spotlighting **specific models that have not been named or detailed in any prior post or article**, from factories that already have a dedicated piece elsewhere. Each post below is about a genuinely different product (different application, different specs) than what the existing piece for that factory covered — checked against the existing text. This is not a new-topic batch and should not be treated as satisfying the "no repeat" rule at the company level; it satisfies it only at the specific-model level, which is the best the current catalog supports.

**Recommendation:** add new factories/models to `factories.csv`/`models.csv` before continuing the Aura Telegram or blog pipeline further — that is the actual fix, not more content-plan files against the same 50 rows.

**Format, unchanged:** bold HTML title first line, hard cap ~1000 characters (fits Telegram's 1024-char caption limit), native in-text `<a href>` link woven into a sentence with a stat in the first half of the post AND a separate closing CTA line (both required for every Aura post, no analytical/no-link exception like GTT 09:00), real spec data from `models.csv`/`factories.csv` only, closing line `🔗 https://www.aura-robotics.ru/ — выбрать робота под вашу задачу` (CTA wording may vary).

---

# 2026-09-05

## 2026-09-05 — Aura Robotics — JAKA MiniCobo (slot 1)
**Slug:** jaka-minicobo-compact-cobot

**Post text (HTML, ready to send):**
<b>JAKA MiniCobo: кобот размером с настольную лампу</b>

JAKA / 节卡机器人 — один из ведущих мировых производителей коллаборативных роботов с грузоподъёмностью линейки от 3 до 30 кг, но самая компактная модель — MiniCobo — рассчитана всего на 1 кг при вылете руки около 580 мм, и характеристики всей линейки собраны в <a href="https://www.aura-robotics.ru/catalog/cobots/factory/jaka">карточке JAKA на сайте</a>. Такой формат — не игрушка, а рабочий инструмент для настольной сборки мелких деталей, лабораторных задач и учебных стендов, где обычный 20-килограммовый кобот попросту избыточен и физически не помещается на столе.

🔗 https://www.aura-robotics.ru/ — выбрать робота под вашу задачу

#Коботы #JAKA #Автоматизация

**Character count:** 638

**Image prompt:**
Professional editorial photograph of a small compact six-axis collaborative robot arm mounted on a laboratory workbench performing precise tabletop assembly of tiny electronic components, bright clean lab lighting, shallow depth of field, photorealistic, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Internal link target:** https://www.aura-robotics.ru/catalog/cobots/factory/jaka (verified exists: yes, source: factories.csv id "jaka", category "cobots"). Note: JAKA already has a combined blog post ("geekplus-warehouse-jaka-dobot-cobots") covering its Zu-series cobots generally — this post is specifically about MiniCobo, a distinct model not named in that piece.

## 2026-09-05 — Aura Robotics — Dobot Magician / Atom (slot 2)
**Slug:** dobot-magician-atom-education

**Post text (HTML, ready to send):**
<b>Dobot Magician: манипулятор, который стоит в тысячах школ и вузов</b>

Dobot / 越疆科技 закрывает весь диапазон от настольных учебных манипуляторов до промышленных коботов на 20 кг, но именно Magician и более компактный Atom стали образовательным стандартом — доступная цена входа и понятный интерфейс программирования, полная линейка — в <a href="https://www.aura-robotics.ru/catalog/education/factory/dobot">карточке Dobot на сайте</a>. Разница между ними простая: Magician — более функциональная платформа для полноценных лабораторных практикумов и прототипирования, Atom — облегчённая версия для первого знакомства с робототехникой без лишних затрат.

🔗 https://www.aura-robotics.ru/ — выбрать робота под вашу задачу

#Коботы #Dobot #Образование

**Character count:** 663

**Image prompt:**
Professional editorial photograph of a small desktop educational robotic arm on a classroom table surrounded by students' laptops and notebooks, bright daylight through windows, shallow depth of field, photorealistic, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Internal link target:** https://www.aura-robotics.ru/catalog/education/factory/dobot (verified exists: yes, source: factories.csv id "dobot", category "education"). Note: Dobot appears in the same combined blog post as JAKA above ("geekplus-warehouse-jaka-dobot-cobots"), which per its title focuses on warehouse/cobot models (CR series, Nova) — Magician/Atom are the desktop-education line, a distinct product family not detailed there.

---

# 2026-09-06

## 2026-09-06 — Aura Robotics — Pudu CC1 / SH1 (slot 1)
**Slug:** pudu-cc1-sh1-cleaning-robots

**Post text (HTML, ready to send):**
<b>Pudu CC1: три функции уборки в одном корпусе</b>

Pudu Robotics / 普渡机器人 — мировой лидер в доставке блюд в зале ресторана, но линейка давно выросла в промышленную уборку: CC1 совмещает мойку, подметание и пылесос в одном корпусе с баками на 15 и 17 литров и мощностью всасывания до 17 000 Па, а SH1 — поломоечная машина с мгновенной сушкой пола, экономящая до 80% воды и моющих средств по сравнению с обычной шваброй; обе модели — в <a href="https://www.aura-robotics.ru/catalog/cleaning/factory/pudu">карточке Pudu на сайте</a>. Для торговых центров и бизнес-центров с большой проходимостью это уже не эксперимент, а замена ручного клининга целой сменой техники.

🔗 https://www.aura-robotics.ru/ — выбрать робота под вашу задачу

#СервисныеРоботы #Pudu #Клининг

**Character count:** 727

**Image prompt:**
Professional editorial photograph of a compact autonomous floor-cleaning robot working in a large bright shopping mall corridor, wet-clean trail visible behind it, shoppers blurred in the background, photorealistic, high detail, cinematic color grading. No text, no logos, no brand names, no watermarks anywhere in the image.

**Internal link target:** https://www.aura-robotics.ru/catalog/cleaning/factory/pudu (verified exists: yes, source: factories.csv id "pudu", category "cleaning"). Note: existing blog post "pudu-orionstar-service-robots" covers Pudu's restaurant delivery robots (BellaBot/KettyBot) — CC1/SH1 are the cleaning line, a distinct application not detailed there.

## 2026-09-06 — Aura Robotics — Fourier ExoMotus (slot 2)
**Slug:** fourier-exomotus-rehabilitation

**Post text (HTML, ready to send):**
<b>Fourier ExoMotus: экзоскелет, который учит заново ходить</b>

Fourier / 傅利叶智能 выросла из реабилитационной робототехники и сохраняет сильную медицинскую компетенцию — рядом с гуманоидами GR-1 и GR-2 в линейке есть ExoMotus, экзоскелет нижних конечностей, который помогает пациентам с травмами позвоночника заново научиться ходить; вся медицинская линейка — в <a href="https://www.aura-robotics.ru/catalog/medical/factory/fourier">карточке Fourier на сайте</a>. Это редкий пример производителя, у которого гуманоиды и медицинская реабилитационная техника растут из одной инженерной базы — контроль баланса и биомеханика тела, отработанные на экзоскелетах, напрямую переносятся в разработку человекоподобных роботов.

🔗 https://www.aura-robotics.ru/ — выбрать робота под вашу задачу

#Медтех #Fourier #Экзоскелет

**Character count:** 725

**Image prompt:**
Professional editorial photograph of a patient using a robotic lower-limb exoskeleton to walk with support bars in a modern rehabilitation clinic, physical therapist observing nearby, bright clinical lighting, photorealistic, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Internal link target:** https://www.aura-robotics.ru/catalog/medical/factory/fourier (verified exists: yes, source: factories.csv id "fourier", category "medical"). Note: existing blog post "fourier-brainco-medical-robots" already covers Fourier's medical angle broadly — this post narrows specifically to the ExoMotus exoskeleton model, flagged as the closest available new angle since the factory-level topic is not fresh; treat with more caution than the other 5 posts in this file.

---

# 2026-09-07

## 2026-09-07 — Aura Robotics — AgiBot Lingxi X1 (slot 1)
**Slug:** agibot-lingxi-x1-open-source

**Post text (HTML, ready to send):**
<b>AgiBot Lingxi X1: гуманоид с открытым исходным кодом</b>

AgiBot / 智元机器人 — один из самых быстрорастущих разработчиков воплощённого ИИ в Китае, а Lingxi X1 в его линейке — полностью открытая (open-source) платформа гуманоида: схемы, программное обеспечение и алгоритмы доступны разработчикам бесплатно, что редкость для этого рынка; вся линейка гуманоидов и колёсных платформ — в <a href="https://www.aura-robotics.ru/catalog/humanoid/factory/agibot">карточке AgiBot на сайте</a>. Такой подход снижает порог входа для сторонних команд, которые хотят экспериментировать с гуманоидной робототехникой без необходимости разрабатывать механику и низкоуровневое ПО с нуля.

🔗 https://www.aura-robotics.ru/ — выбрать робота под вашу задачу

#Гуманоиды #AgiBot #OpenSource

**Character count:** 704

**Image prompt:**
Professional editorial photograph of an open-frame humanoid robot chassis on a workbench with visible internal wiring and joints, a developer's laptop with code open nearby, bright workshop lighting, photorealistic, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Internal link target:** https://www.aura-robotics.ru/catalog/humanoid/factory/agibot (verified exists: yes, source: factories.csv id "agibot", category "humanoid"). Note: AgiBot already has two dedicated comparison posts ("agibot-robotera-ubtech-humanoid-factories", "agibot-yuanzheng-a2-vs-robotera-l7") focused on the Yuanzheng A2 flagship humanoid — Lingxi X1 is a distinct open-source platform not detailed in either.

## 2026-09-07 — Aura Robotics — UBTech Cruzr (slot 2)
**Slug:** ubtech-cruzr-service-robot

**Post text (HTML, ready to send):**
<b>UBTech Cruzr: не гуманоид с руками, а колёсный консультант в торговом зале</b>

UBTech / 优必选 известна прежде всего гуманоидом Walker S, который внедряют на автозаводах для контроля качества и сортировки, но в линейке есть и Cruzr — колёсный сервисный робот с облачным подключением, распознаванием лиц и обработкой естественного языка для приветствия и консультирования посетителей; обе линии — в <a href="https://www.aura-robotics.ru/catalog/service/factory/ubtech">карточке UBTech на сайте</a>. Для торговых залов и шоурумов колёсная платформа с диалоговым интерфейсом часто практичнее человекоподобного робота: дешевле, надёжнее и не требует решения сложных задач с балансом при ходьбе.

🔗 https://www.aura-robotics.ru/ — выбрать робота под вашу задачу

#СервисныеРоботы #UBTech #Ритейл

**Character count:** 727

**Image prompt:**
Professional editorial photograph of a friendly wheeled service robot with a screen face greeting visitors in a bright modern retail showroom, soft ambient lighting, shallow depth of field, photorealistic, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Internal link target:** https://www.aura-robotics.ru/catalog/service/factory/ubtech (verified exists: yes, source: factories.csv id "ubtech", category "service"). Note: existing content ("ubtech-walker-s-humanoid-factory" blog post, plus TG/blog comparison pieces) covers Walker S specifically — Cruzr is UBTech's wheeled service line, a distinct product not detailed elsewhere.
