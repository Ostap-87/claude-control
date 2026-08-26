# GlobalTechTour — Telegram batch continuation (2026-09-05 → 2026-09-10)

**Continues from `20-day-batch.md`**, which already covers GlobalTechTour TG posts through 2026-09-04 (topics from `globaltechtour-tg-month.md` #1-3, #5-21 used). This file picks up from **2026-09-05** and uses the 6 remaining topics from `globaltechtour-tg-month.md` (#4 DJI, #22 airlines, #23 Shenzhen, #24 panda diplomacy, #25 SE Asia localization, #26 waste management) plus 6 additional new companies not yet covered anywhere in the blog or TG history (verified via WebSearch, not from the original tg-month list): Bilibili, Full Truck Alliance, JinkoSolar, China Tourism Group Duty Free (CDF), Kingsoft/WPS, Niu Technologies.

**Format, unchanged from `20-day-batch.md`:** bold HTML title first line, ~1000-char hard cap, 09:00 slot = analytical (no link, no CTA), 18:00 slot = sales (native in-text link woven into a sentence with a stat + closing CTA line), brand hashtags `#GTT #GlobalTechTour #Техтуризм` + 1-2 topical/geo tags on every post, Chinese name at first mention where applicable. Data Q3 2025 – 2026 only, verified via WebSearch immediately before writing (sources listed per post).

**Note on link targets:** none of the 6 new companies (Bilibili, Full Truck Alliance, JinkoSolar, CDF, Kingsoft, Niu) have a dedicated card in `companies.json` — verified by direct lookup. DJI, NetEase already exist as company ids and are used in the blog batch, not repeated here as a link target to avoid double-dipping the same card in the same window; the 18:00 posts below link either to `/companies/{id}` where a real id exists, or to the closest matching real tour id from `tours.json`, flagged per post.

---

# 2026-09-05

## 2026-09-05 — GlobalTechTour — Shenzhen tech clusters (09:00, analytical)
**Slug:** shenzhen-hardware-cluster-2026

**Post text (HTML, ready to send):**
<b>Шэньчжэнь: один город — 106 сделок в робототехнике за год</b>

Экспорт из зоны Шэньчжэня достиг 41,7 млрд долларов в июне 2026 года против 36,4 млрд в мае — рост даже месяц к месяцу заметен невооружённым глазом. Но интереснее другое: инвестиции в хардвер и робототехнику в городе выросли примерно в 7 раз за 2025 год — более 10 млрд юаней распределились по 106 сделкам. Власти запустили план развития кластера embodied intelligence robotics на 2025-2027 годы с целью довести число компаний в нём до 1200+. Для тех, кто ищет объяснение, почему именно Шэньчжэнь, а не Пекин или Шанхай, стал точкой сборки для железа, — ответ в инфраструктуре: вертикально интегрированные цепочки поставок, готовые прототипы за дни, а не месяцы, и доступ к поставщикам компонентов первого уровня в радиусе часа езды.

#GTT #GlobalTechTour #Техтуризм #Шэньчжэнь #Робототехника

**Character count:** 862

**Image prompt:**
Photorealistic editorial photo of a dense Shenzhen electronics manufacturing district at dusk, illuminated factory buildings and cranes, small delivery trucks on the street, warm city lights reflecting off wet pavement, cinematic wide shot, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-05-shenzhen-hardware-cluster-2026.png

**Internal link target:** none (analytical 09:00 slot — no link required per format).

**Sources checked:** CEIC Shenzhen export data, Startup Genome Shenzhen ecosystem report, 2025-2027 municipal embodied intelligence robotics action plan coverage (2026).

## 2026-09-05 — GlobalTechTour — Bilibili (18:00, sales)
**Slug:** bilibili-user-growth-2026

**Post text (HTML, ready to send):**
<b>Bilibili: платформа для аниме-фанатов доросла до 376 млн активных пользователей</b>

Bilibili / 哔哩哔哩 в первом квартале 2026 года нарастила дневную аудиторию до 115 млн человек (+8% год к году) при месячной аудитории в 376 млн — а как устроена вся экосистема китайских интернет-платформ, от видео до соцкоммерции, разбираем в программе <a href="https://globaltechtour.ru/expeditions/china-tech-giants-expedition">«Технологические гиганты Китая»</a>. Рост подпитывают не только реклама и подписки, но и новый формат Pause Ads — реклама, которая появляется в момент паузы видео, и заметно растущее качество длинных видео за счёт внутренних AI-инструментов монтажа и рекомендаций.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Интернет #Bilibili

**Character count:** 812

**Image prompt:**
Photorealistic editorial photo of a young content creator recording a video in a small modern home studio with ring light and a video streaming interface visible on a monitor in the background, warm ambient lighting, shallow depth of field, cinematic color grading. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-05-bilibili-user-growth-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tech-giants-expedition (verified exists: yes, source: tours.json id "china-tech-giants-expedition", sector "flagship"; no dedicated company card for Bilibili, tour used as closest thematic fallback).

**Sources checked:** Bilibili Q1 2026 financial results (GlobeNewswire), TipRanks/Yahoo Finance Q1 2026 earnings coverage, Pluang Q2 2026 preview.

---

# 2026-09-06

## 2026-09-06 — GlobalTechTour — Panda diplomacy / soft power (09:00, analytical)
**Slug:** panda-diplomacy-soft-power-2026

**Post text (HTML, ready to send):**
<b>Панды как инструмент дипломатии — и часть имиджа китайского бизнеса за рубежом</b>

Панда-дипломатия — это не сентиментальная деталь, а вполне рабочий механизм: Китай не дарит панд иностранным зоопаркам, а сдаёт их в аренду сроком до 10 лет (с возможностью продления) за плату до 1 млн долларов в год. В 2026 году пары панд ждут в Сан-Франциско, а в Вашингтоне уже дебютировали два новых зверя в Национальном зоопарке. Формально это вопрос охраны природы и культурного обмена, но по факту — устойчивый канал позитивного внимания к Китаю в местных СМИ на годы вперёд, который работает параллельно с любыми торговыми переговорами и время от времени становится заложником охлаждения отношений между странами.

#GTT #GlobalTechTour #Техтуризм #Китай #СофтПауэр

**Character count:** 764

**Image prompt:**
Photorealistic editorial photo of a giant panda calmly eating bamboo in a modern zoo enclosure with lush green landscaping, soft natural daylight, shallow depth of field, cinematic nature photography style, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-06-panda-diplomacy-soft-power-2026.png

**Internal link target:** none (analytical 09:00 slot — no link required per format).

**Sources checked:** American University Magazine explainer, Harvard PON negotiation program, Insights on India panda diplomacy overview (2026).

## 2026-09-06 — GlobalTechTour — Full Truck Alliance (18:00, sales)
**Slug:** full-truck-alliance-freight-2026

**Post text (HTML, ready to send):**
<b>Full Truck Alliance: «Uber для грузовиков» обработал 68,5 млн заказов за квартал</b>

Full Truck Alliance / 满帮集团 (Manbang) за второй квартал 2026 года выполнила 68,5 млн заказов (+12,7% год к году), а маржинальность выросла до рекордных 46,7% — логистические платформы такого масштаба разбираем в программе <a href="https://globaltechtour.ru/expeditions/china-logistics-top10-expedition">«Топ-10 логистических компаний Китая»</a>. Ключевой драйвер — сдвиг к услугам грузового брокериджа: их доля выросла с 41% до 52,2% выручки за год, потому что именно этот сегмент даёт перевозчику НДС-документы и онлайн-расчёты, за которые готовы платить премию.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Логистика #FullTruckAlliance

**Character count:** 793

**Image prompt:**
Photorealistic editorial photo of a long line of freight trucks at a busy Chinese highway logistics hub at sunrise, drivers checking a mobile app near their cabs, wide industrial scale, cinematic golden lighting, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-06-full-truck-alliance-freight-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-logistics-top10-expedition (verified exists: yes, source: tours.json id "china-logistics-top10-expedition", sector "logistics"; no dedicated company card for Full Truck Alliance).

**Sources checked:** Full Truck Alliance Q2 2026 results (Investing.com, TradingKey, Alphastreet).

---

# 2026-09-07

## 2026-09-07 — GlobalTechTour — SE Asia localization / tariffs (09:00, analytical)
**Slug:** china-sea-localization-2026

**Post text (HTML, ready to send):**
<b>Почему китайские заводы едут во Вьетнам и Индонезию — и почему не все остаются</b>

Заводские цеха, которые ещё недавно шумели только в Гуандуне и Цзянсу, сегодня зеркально повторяются во Вьетнаме, Таиланде, Малайзии и Индонезии — китайские компании ищут способ обойти американские пошлины, а глобальные бренды заодно диверсифицируют производство вне Китая. Вьетнам и Индонезия предлагают многолетние налоговые каникулы, освобождение от пошлин на ввозимое оборудование и ускоренное оформление разрешений для экспортёров. Но в 2026 году тарифное преимущество, которое изначально запускало этот переезд, во многом стёрлось: Китай и Вьетнам теперь платят почти одинаковую пошлину по разделу 301 (около 12,5%), а Камбоджа, Индонезия и Малайзия — около 10%. Часть компаний, переехавших ради обхода тарифов, уже пересматривает решение — кто-то возвращается, большинство просто застряло посередине.

#GTT #GlobalTechTour #Техтуризм #ЮВА #Тарифы

**Character count:** 953

**Image prompt:**
Photorealistic editorial photo of a modern industrial park under construction in Southeast Asia with new factory buildings and cranes, tropical vegetation in the background, workers in safety vests, bright midday light, cinematic wide shot, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-07-china-sea-localization-2026.png

**Internal link target:** none (analytical 09:00 slot — no link required per format).

**Sources checked:** ARC Group manufacturing relocation overview, MTG Transform tariff/reshoring analysis, Lehigh University SEA-in-media brief (2026).

## 2026-09-07 — GlobalTechTour — JinkoSolar (18:00, sales)
**Slug:** jinkosolar-overseas-shipments-2026

**Post text (HTML, ready to send):**
<b>JinkoSolar: 80% отгрузок панелей уходит за рубеж</b>

JinkoSolar / 晶科能源 в первом квартале 2026 года отгрузила 13,7 ГВт солнечных модулей, из них более 80% — на зарубежные рынки; полный годовой план — 75-85 ГВт, а зелёную энергетику Китая целиком разбираем в программе <a href="https://globaltechtour.ru/expeditions/china-waste-management-expedition">по устойчивому производству</a>. Особенно быстро растёт менее заметное направление — системы накопления энергии: поставки выросли более чем на 350% год к году, и большая часть ушла в Европу и США — рынки, готовые платить премию за надёжность и сертификацию.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Энергетика #JinkoSolar

**Character count:** 792

**Image prompt:**
Photorealistic editorial photo of workers inspecting rows of solar panels at a large-scale solar farm under a clear blue sky, drone-eye wide angle, crisp daylight, cinematic composition, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-07-jinkosolar-overseas-shipments-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-waste-management-expedition (verified exists: yes, source: tours.json id "china-waste-management-expedition", sector "heavy" — closest available sustainability/heavy-industry tour; no dedicated solar-specific tour or company card exists for JinkoSolar, flagged as an imperfect thematic fallback for human review).

**Sources checked:** JinkoSolar Q1 2026 financial results (PRNewswire, GreentechLead, Investing.com).

---

# 2026-09-08

## 2026-09-08 — GlobalTechTour — Waste management / circular economy (09:00, analytical)
**Slug:** china-circular-economy-2026

**Post text (HTML, ready to send):**
<b>Рынок переработки отходов Китая — уже 187 млрд долларов</b>

Рынок управления отходами Китая оценивается в 187 млрд долларов в 2026 году с прогнозным ростом до 246,6 млрд к 2031-му (CAGR 5,68%). В январе 2026 года Госсовет утвердил план комплексного управления твёрдыми отходами, а в рамках 15-й пятилетки (2026-2030) поставлена цель к 2030 году утилизировать 4,5 млрд тонн крупнотоннажных отходов и 510 млн тонн вторичных ресурсов ежегодно. Это не абстрактная экологическая повестка, а формирующийся рынок с реальными игроками — среди крупных операторов China Everbright Environment и Beijing Enterprises Environment Group, — где государственное регулирование целенаправленно создаёт спрос на технологии сортировки, цифровой учёт отходов и переработку специфических промышленных фракций.

#GTT #GlobalTechTour #Техтуризм #Экология #ТяжПром

**Character count:** 866

**Image prompt:**
Photorealistic editorial photo of a modern automated waste sorting facility with conveyor belts separating recyclable materials, workers monitoring control screens, clean industrial lighting, cinematic wide shot, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-08-china-circular-economy-2026.png

**Internal link target:** none (analytical 09:00 slot — no link required per format).

**Sources checked:** Mordor Intelligence China Waste Management Market report, IndexBox coverage of China's 2026-2030 solid waste plan, Xinhua circular economy overview.

## 2026-09-08 — GlobalTechTour — China Tourism Group Duty Free / CDF (18:00, sales)
**Slug:** cdf-hainan-duty-free-2026

**Post text (HTML, ready to send):**
<b>CDF: как один оператор держит дьюти-фри целого острова</b>

China Tourism Group Duty Free (CDF) / 中国旅游集团中免股份 получила за первое полугодие 2026 года выручку в 27,6 млрд юаней, а офшорные продажи дьюти-фри на Хайнане выросли на 5% год к году до 6 млрд юаней — про то, как устроен ритейл на туристических хабах Китая, рассказываем в программе <a href="https://globaltechtour.ru/expeditions/china-global-brands-expedition">по потребительским брендам Китая</a>. Чистая прибыль при этом выросла сразу на 19,5% — компания нарастила эффективность за счёт запуска круглоостровной офшорной беспошлинной политики и интеграции купленного ранее бизнеса DFS в Большом Китае.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Ритейл #CDF

**Character count:** 774

**Image prompt:**
Photorealistic editorial photo of a spacious upscale duty-free shopping mall interior with glossy floors, luxury storefronts, and travelers browsing with shopping bags, bright modern lighting, cinematic wide shot, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-08-cdf-hainan-duty-free-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-global-brands-expedition (verified exists: yes, source: tours.json id "china-global-brands-expedition", sector "consumer"; no dedicated company card for CDF).

**Sources checked:** Moodie Davitt Report H1 2026 coverage, TipRanks/Globe and Mail CDF interim results.

---

# 2026-09-09

## 2026-09-09 — GlobalTechTour — China Southern / China Eastern Airlines (09:00, analytical)
**Slug:** china-airlines-international-routes-2026

**Post text (HTML, ready to send):**
<b>Китайские авиакомпании открывают Хельсинки, Вену и Стокгольм разом</b>

China Southern Airlines в марте 2026 года нарастила международный пассажиропоток на 23% год к году и запускает беспосадочный рейс Пекин Дасин — Хельсинки, а China Eastern в летне-осеннем сезоне 2026 года выполняет 20 маршрутов Китай-Европа (без учёта России) — почти 1,9 млн мест в обе стороны против 1,58 млн годом ранее, включая возобновлённый после шестилетнего перерыва рейс Шанхай-Стокгольм и новый маршрут Сиань-Вена. За 40-дневный период Праздника Весны China Southern в одиночку запланировала около 126 тысяч пассажирских рейсов, из них порядка 16 тысяч международных. Это не разовый всплеск, а системное расширение международной маршрутной сети китайских перевозчиков, совпадающее с ростом делового и туристического трафика между Китаем и Европой.

#GTT #GlobalTechTour #Техтуризм #Авиация #Китай

**Character count:** 930

**Image prompt:**
Photorealistic editorial photo of a wide-body passenger airplane taking off at golden hour from a modern international airport runway, dramatic sky, motion blur on landing gear retraction, cinematic aviation photography, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-09-china-airlines-international-routes-2026.png

**Internal link target:** none (analytical 09:00 slot — no link required per format).

**Sources checked:** Aviation Week "By The Numbers: China Q2 2026", Travel And Tour World coverage of China Southern/China Eastern 2026 route expansion.

## 2026-09-09 — GlobalTechTour — Kingsoft / WPS Office (18:00, sales)
**Slug:** kingsoft-wps-overseas-2026

**Post text (HTML, ready to send):**
<b>WPS Office: 676 млн активных устройств и рост зарубежной выручки на 54%</b>

Kingsoft Office / 金山办公 (WPS) отчиталась о 676 млн активных устройств по всему миру в первом полугодии 2026 года, а зарубежная индивидуальная выручка выросла на 53,7% год к году — про экспорт китайского софта и AI-продуктов подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-tech-giants-expedition">«Технологические гиганты Китая»</a>. Число зарубежных активных устройств на ПК-версии WPS выросло на 53,8% год к году до 42,47 млн, а платящих индивидуальных пользователей за рубежом стало на 63,4% больше — компания вкладывается в WPS AI как основной драйвер удержания подписчиков.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Софт #WPS

**Character count:** 782

**Image prompt:**
Photorealistic editorial photo of a professional working on office productivity software on a laptop in a bright modern co-working space, multiple documents visible on screen in soft focus, natural window light, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-09-kingsoft-wps-overseas-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tech-giants-expedition (verified exists: yes, source: tours.json id "china-tech-giants-expedition", sector "flagship"; no dedicated company card for Kingsoft/WPS).

**Sources checked:** Kingsoft Office H1 2026 results coverage (Futunn, AIbase, BigGo Finance).

---

# 2026-09-10

## 2026-09-10 — GlobalTechTour — Hengrui Medicine (09:00, analytical)
**Slug:** hengrui-medicine-licensing-2026

**Post text (HTML, ready to send):**
<b>Hengrui: 42 млрд долларов сделок за три года — китайская фарма продаёт не таблетки, а лицензии</b>

Hengrui Medicine / 恒瑞医药 с 2023 года заключила 13 сделок по выводу препаратов на внешние рынки (лицензирование, создание NewCo, стратегические альянсы) на общую потенциальную сумму около 42 млрд долларов — партнёрами выступают BMS, GSK и другие глобальные фармгиганты. За первое полугодие 2026 года выручка компании достигла 15,46 млрд юаней, из которых 1,42 млрд юаней (около 211,6 млн долларов) — доход именно от лицензионных сделок и платежей за достижение вех. Продажи инновационных препаратов выросли на 16,4% год к году и уже занимают 63,2% продаж лекарств компании. Модель, при которой китайская фармкомпания зарабатывает не столько на прямых продажах готового лекарства, сколько на продаже прав на его разработку и коммерциализацию другим, ещё недавно была нетипичной для отрасли — сейчас это один из главных источников роста.

#GTT #GlobalTechTour #Техтуризм #Медтех #Фарма

**Character count:** 970

**Image prompt:**
Photorealistic editorial photo of a modern pharmaceutical research laboratory with scientists in white coats examining molecular structure models on a large screen, clean bright lighting, shallow depth of field, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-10-hengrui-medicine-licensing-2026.png

**Internal link target:** none (analytical 09:00 slot — no link required per format).

**Sources checked:** Hengrui Pharma H1 2026 interim results (BioSpace, PRNewswire), BigGo Finance coverage of innovative drug revenue.

## 2026-09-10 — GlobalTechTour — Niu Technologies (18:00, sales)
**Slug:** niu-technologies-overseas-2026

**Post text (HTML, ready to send):**
<b>Niu: зарубежная сеть дилеров выросла до 417 точек за полгода</b>

Niu Technologies / 小牛电动 нарастила зарубежную дилерскую сеть с 307 точек в начале 2026 года до 417 к концу второго квартала, а продажи электромотоциклов за рубежом выросли на 50% год к году до 4800 единиц — про экспорт китайского электротранспорта смотрите в программе <a href="https://globaltechtour.ru/expeditions/china-appliances-expedition">по электронике и технике Китая</a>. При этом зарубежная выручка от электроскутеров в первом квартале снизилась на 15,2% год к году — компания сознательно проходит через смену модели дистрибуции и сокращение складских запасов за рубежом, ставя на электромотоциклы как более рентабельный сегмент вместо простого наращивания объёма скутеров.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Электротранспорт #Niu

**Character count:** 810

**Image prompt:**
Photorealistic editorial photo of a sleek electric motorcycle parked in front of a small international dealership storefront with large display windows, bright daylight, shallow depth of field, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-10-niu-technologies-overseas-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-appliances-expedition (verified exists: yes, source: tours.json id "china-appliances-expedition", sector "electronics" — closest available fallback; no dedicated company card or EV-specific tour exists for Niu, flagged for human review).

**Sources checked:** Niu Technologies Q1/Q2 2026 financial results (GlobeNewswire, StockTitan, Yahoo Finance).

# 2026-09-11

## 2026-09-11 — GlobalTechTour — Canton Fair 2026 (09:00, analytical)
**Slug:** canton-fair-spring-2026

**Post text (HTML, ready to send):**
<b>Canton Fair 2026: 32 000 экспонентов и роботы как новый локомотив выставки</b>

Весенняя сессия Canton Fair 2026 в Гуанчжоу собрала свыше 32 000 экспонентов и около 210 000 предзарегистрированных зарубежных байеров — рекордная явка для крупнейшей торговой выставки Китая. Интересный сдвиг структуры: интеллектуальная продукция вроде промышленных и сервисных роботов стала одним из главных драйверов роста, а один из производителей робототехники прогнозировал рост своего экспорта в 5-10 раз за год. Осенняя сессия пройдёт в три этапа с 15 октября по 4 ноября — для тех, кто следит за структурными сдвигами китайского экспорта, именно состав экспонентов на таких площадках красноречивее любой макростатистики.

#GTT #GlobalTechTour #Техтуризм #Экспорт #Гуанчжоу

**Character count:** 780

**Image prompt:**
Photorealistic editorial photo of a massive international trade fair exhibition hall in Guangzhou with countless product booths and crowds of international buyers, bright convention lighting, wide angle, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-11-canton-fair-spring-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** CGTN Canton Fair coverage (April 2026), Canton Fair official autumn 2026 schedule.

## 2026-09-11 — GlobalTechTour — XPeng Europe expansion (18:00, sales)
**Slug:** xpeng-europe-expansion-2026

**Post text (HTML, ready to send):**
<b>XPeng: 290 салонов в Европе и рост зарубежных поставок на 96% за год</b>

小鹏汽车 / XPeng нарастил зарубежные поставки до 45 008 машин в 2025 году (+96% год к году), работает уже в 60 странах и охватывает 28 стран Европы через 290 розничных точек — про то, как устроено производство и экспорт китайских электромобилей, рассказываем в программе <a href="https://globaltechtour.ru/expeditions/china-auto-plants-expedition">по автозаводам Китая</a>. В 2026 году компания намерена удвоить зарубежные продажи, ориентируясь примерно на 90 000 регистраций вне Китая — модель P7+ уже запущена одновременно в 36 странах.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #EV #XPeng

**Character count:** 726

**Image prompt:**
Photorealistic editorial photo of a modern electric sedan on display in a sleek European car showroom with large glass windows, bright daylight, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-11-xpeng-europe-expansion-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-auto-plants-expedition (verified exists: tours.json tour_id "china-auto-plants-expedition", sector "auto"; company card exists: /companies/xpeng, sector "auto").

**Sources checked:** CnEVPost XPeng overseas footprint coverage (Jan 2026), Gasgoo XPeng global expansion report.

---

# 2026-09-12

## 2026-09-12 — GlobalTechTour — Low-altitude economy policy (09:00, analytical)
**Slug:** china-low-altitude-economy-2026

**Post text (HTML, ready to send):**
<b>«Низковысотная экономика»: Китай законодательно закрепляет рынок дронов и eVTOL</b>

Два обязательных национальных стандарта по идентификации и регистрации беспилотников вступают в силу 1 мая 2026 года, а обновлённый Закон о гражданской авиации — с 1 июля, закрепляя обязательства по развитию низковысотной инфраструктуры на уровне местных властей. Рынок пилотируемых eVTOL и связанных сервисов в Китае, по прогнозам, достигнет 200-400 млрд юаней (28-56 млрд долларов) в год к 2035-му — и это уже не футуристический прогноз, а рынок с реальными коммерческими операторами и туристическими маршрутами в Гуанчжоу и Хэфэе.

#GTT #GlobalTechTour #Техтуризм #Дроны #eVTOL

**Character count:** 692

**Image prompt:**
Photorealistic editorial photo of a small electric passenger aircraft (eVTOL) taking off vertically from an urban rooftop pad at dusk, city skyline in the background, cinematic wide shot, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-12-china-low-altitude-economy-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** Aviation International News (China low-altitude economy, Jan 2026), lowaltitudeeconomy.aero 2026 coverage.

## 2026-09-12 — GlobalTechTour — EHang eVTOL certification (18:00, sales)
**Slug:** ehang-evtol-certification-2026

**Post text (HTML, ready to send):**
<b>EHang прошёл полную сертификацию eVTOL за 31 месяц вместо привычных 7 лет</b>

EHang первым в мире завершил полную «четырёхсертификатную» коммерческую сертификацию eVTOL EH216-S (тип, производство, лётная годность, эксплуатант) — процесс занял 31 месяц и 40 000 тестовых полётов, тогда как аналогичный путь у FAA и EASA обычно растягивается на 5-7 лет; о новых индустриях, меняющих облик китайских городов, — в программе <a href="https://globaltechtour.ru/expeditions/china-tech-parks-expedition">по технопаркам Китая</a>. Уже сегодня можно купить билет на низковысотную туристическую экскурсию в Гуанчжоу или Хэфэе — эра пассажирских беспилотных полётов в Китае официально началась.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #EHang #eVTOL

**Character count:** 754

**Image prompt:**
Photorealistic editorial photo of a sleek autonomous passenger drone aircraft on a landing pad with a small group of curious onlookers, bright daylight, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-12-ehang-evtol-certification-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tech-parks-expedition (verified exists: tours.json tour_id "china-tech-parks-expedition", sector "government"; no dedicated company card for EHang).

**Sources checked:** EHang official press release (Air Operator Certificate), businessaviation.aero certification timeline comparison.

---

# 2026-09-13

## 2026-09-13 — GlobalTechTour — Semiconductor self-sufficiency (09:00, analytical)
**Slug:** china-chip-self-sufficiency-2026

**Post text (HTML, ready to send):**
<b>28% вместо 16%: как быстро Китай наращивает собственное производство чипов</b>

Доля отечественного производства полупроводников в Китае выросла до 28% в четвёртом квартале 2025 года против 16% годом ранее — рост подпитывают свыше 150 млрд долларов государственных субсидий и прорыв в 7-нанометровом производстве. С 2026 года действует требование использовать не менее 50% отечественного оборудования при вводе новых производственных мощностей — политика, которая уже меняет закупочные решения по всей отрасли. Официальная цель — 80% самообеспеченности, хотя аналогичная цель на 2025 год (70%) была ощутимо не выполнена.

#GTT #GlobalTechTour #Техтуризм #Полупроводники #Китай

**Character count:** 705

**Image prompt:**
Photorealistic editorial photo of a semiconductor cleanroom with technicians in full protective suits working near wafer fabrication equipment, sterile bright lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-13-china-chip-self-sufficiency-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** TechWireAsia (China chip self-sufficiency, May 2026), Astute Group coverage of domestic equipment mandate.

## 2026-09-13 — GlobalTechTour — SMIC 7nm production (18:00, sales)
**Slug:** smic-7nm-production-2026

**Post text (HTML, ready to send):**
<b>SMIC освоил 7-нм чипы без EUV-литографии — в обход западных ограничений</b>

中芯国际 / SMIC объявил об успешном массовом производстве 7-нанометровых чипов без использования EUV-литографии, применив многократное мультипатернирование — техническое решение, обходящее западные экспортные ограничения на самое передовое литографическое оборудование; о полупроводниковой отрасли Китая подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-tech-giants-expedition">«Технологические гиганты Китая»</a>. Компания также запустила массовое производство ИИ-чипа Huawei Ascend 910B и планирует удвоить мощности 7-нм линии в 2026 году.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #SMIC #Полупроводники

**Character count:** 718

**Image prompt:**
Photorealistic editorial photo of a close-up of a silicon wafer being inspected under bright industrial lighting in a semiconductor fab, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-13-smic-7nm-production-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tech-giants-expedition (verified exists: sector "flagship"; company card exists: /companies/smic, sector "electronics").

**Sources checked:** SCMP (SMIC action plan, 2026), TechWireAsia 7nm EUV-free production coverage.

# 2026-09-14

## 2026-09-14 — GlobalTechTour — China outbound tourism recovery (09:00, analytical)
**Slug:** china-outbound-tourism-2026

**Post text (HTML, ready to send):**
<b>Китай возвращает себе титул крупнейшего рынка выездного туризма</b>

Число выездных поездок из Китая достигнет 101 млн в 2026 году, вплотную приближаясь к допандемийному уровню 2019-го, а расходы китайских туристов за рубежом вырастут на 22,5% — почти до 280 млрд долларов. Япония лидирует среди направлений с прогнозом в 8,6 млн визитов (89% восстановления), за ней следуют Южная Корея (6 млн) и Таиланд (5,1 млн). Любопытный нюанс: восстановление спроса опережает восстановление провозных мощностей — на отдельных направлениях уже не хватает прямых рейсов под растущий поток пассажиров.

#GTT #GlobalTechTour #Техтуризм #Туризм #Китай

**Character count:** 685

**Image prompt:**
Photorealistic editorial photo of a group of Chinese tourists with luggage at a busy international airport departure gate, bright terminal lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-14-china-outbound-tourism-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** IAG/asgam.com (China outbound tourism 2026), Skift (aviation capacity constraints, July 2026).

## 2026-09-14 — GlobalTechTour — Meituan KeeTa Middle East (18:00, sales)
**Slug:** meituan-keeta-middle-east-2026

**Post text (HTML, ready to send):**
<b>Keeta от Meituan уже в Дубае, Эр-Рияде и Дохе — экспансия день за днём</b>

美团 / Meituan через международный бренд Keeta вышла в Саудовскую Аравию, Катар, Кувейт и ОАЭ, покрыв свыше 20 городов Саудовской Аравии, а к июню 2026 года планирует присутствие в 15 крупнейших мегаполисах региона — про экосистему китайских интернет-платформ подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-retail-showrooms-expedition">по ритейл-шоурумам Китая</a>. В Гонконге Keeta стал лидером рынка доставки еды после ухода Deliveroo в 2025 году — показательный пример того, как китайские платформы занимают освобождающиеся ниши за рубежом.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Meituan #Экспансия

**Character count:** 723

**Image prompt:**
Photorealistic editorial photo of a food delivery courier on an electric scooter navigating a modern Middle Eastern city street at dusk, city lights and skyline in the background, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-14-meituan-keeta-middle-east-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-retail-showrooms-expedition (verified exists: tours.json tour_id "china-retail-showrooms-expedition", sector "internet"; company card exists: /companies/meituan, sector "internet").

**Sources checked:** SCMP (Meituan Keeta Middle East, 2026), Momentum Works thelowdown coverage.

---

# 2026-09-15

## 2026-09-15 — GlobalTechTour — RCEP/SEA trade growth (09:00, analytical)
**Slug:** rcep-asean-trade-growth-2026

**Post text (HTML, ready to send):**
<b>ЮВА окончательно стала вторым домом для китайского капитала</b>

Соглашение RCEP продолжает углублять торговые связи Китая с Юго-Восточной Азией — регион уже несколько лет подряд остаётся крупнейшим торговым партнёром Китая, а поток прямых инвестиций туда усиливается на фоне переноса части производственных цепочек из самого Китая. Параллельно расширяется финансовая интеграция: национальные QR-системы Индонезии, Малайзии, Таиланда и Вьетнама в 2026 году напрямую интегрированы с китайскими платёжными платформами, что упрощает как туристические, так и B2B-расчёты между регионами.

#GTT #GlobalTechTour #Техтуризм #ЮВА #RCEP

**Character count:** 645

**Image prompt:**
Photorealistic editorial photo of a bustling Southeast Asian port with cargo ships and container cranes at sunrise, wide industrial shot, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-15-rcep-asean-trade-growth-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** SCMP (China-Indonesia cross-border QR payments, 2026), digitalinasia.com SEA payments overview.

## 2026-09-15 — GlobalTechTour — Alibaba Cloud international data centers (18:00, sales)
**Slug:** alibaba-cloud-international-2026

**Post text (HTML, ready to send):**
<b>Alibaba Cloud открывает дата-центры в Париже и Джохоре, выручка облака — 41,6 млрд юаней за квартал</b>

阿里云 / Alibaba Cloud нарастил квартальную выручку до 41,63 млрд юаней (+40% год к году за счёт внешней коммерциализации) и одновременно объявил о новых дата-центрах в Париже, Джохоре, Мексике, Японии, Корее и Дубае — про облачную и ИИ-инфраструктуру Китая подробнее в программе <a href="https://globaltechtour.ru/expeditions/uae-ai-tech-expedition">по ИИ и технологиям ОАЭ</a>. Компания делает ставку на спрос со стороны ИИ-инференса, напрямую конкурируя с AWS и Azure за зарубежных корпоративных клиентов.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #AlibabaCloud #ИИ

**Character count:** 706

**Image prompt:**
Photorealistic editorial photo of a modern data center facility interior with rows of server racks and blue ambient lighting, technician monitoring systems, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-15-alibaba-cloud-international-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/uae-ai-tech-expedition (verified exists: tours.json tour_id "uae-ai-tech-expedition", sector "ai"; company card exists: /companies/alibaba-cloud-me, sector "ai").

**Sources checked:** Pandaily (Alibaba Cloud overseas expansion, July 2026), DatacenterDynamics coverage.

---

# 2026-09-16

## 2026-09-16 — GlobalTechTour — Short-video/live-commerce ecosystem (09:00, analytical)
**Slug:** china-short-video-livecommerce-2026

**Post text (HTML, ready to send):**
<b>Короткое видео как экспортный товар: китайские приложения захватывают мировой топ загрузок</b>

Китайские приложения для создания и монтажа видео устойчиво занимают верхние строчки мировых рейтингов загрузок — формат, рождённый внутри китайской live-commerce экосистемы, оказался универсальным продуктом для глобального рынка. Успех подобных приложений строится на плотной интеграции ИИ-инструментов монтажа прямо в потребительский продукт — то, что западные аналоги пока предлагают заметно позже и по частям, а не единым интегрированным решением.

#GTT #GlobalTechTour #Техтуризм #Видео #ИИ

**Character count:** 570

**Image prompt:**
Photorealistic editorial photo of a young content creator recording a video with a smartphone gimbal in a bright modern home studio, warm ambient lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-16-china-short-video-livecommerce-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** ExpandedRamblings/SendShort CapCut statistics 2026, RestOfWorld CapCut MAU coverage.

## 2026-09-16 — GlobalTechTour — ByteDance CapCut global growth (18:00, sales)
**Slug:** bytedance-capcut-global-growth-2026

**Post text (HTML, ready to send):**
<b>CapCut от ByteDance: 800 млн активных пользователей в месяц по всему миру</b>

字节跳动 / ByteDance довёл месячную аудиторию видеоредактора CapCut до свыше 800 млн активных пользователей к апрелю 2026 года, сделав его самым скачиваемым приложением для монтажа видео в мире — про экосистему китайских интернет-платформ подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-tech-giants-expedition">«Технологические гиганты Китая»</a>. В мае 2026 года компания анонсировала интеграцию с Google Gemini прямо внутри приложения — редкий пример прямого партнёрства китайского и американского ИИ-продукта на потребительском уровне.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #ByteDance #CapCut

**Character count:** 719

**Image prompt:**
Photorealistic editorial photo of a smartphone screen showing a video editing app interface with colorful timeline tracks, held by a hand, blurred creative studio background, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-16-bytedance-capcut-global-growth-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tech-giants-expedition (company card exists: /companies/bytedance, sector "internet").

**Sources checked:** SendShort CapCut statistics 2026, MLQ News (CapCut Gemini integration, May 2026).

# 2026-09-17

## 2026-09-17 — GlobalTechTour — China's silver economy (09:00, analytical)
**Slug:** china-silver-economy-2026

**Post text (HTML, ready to send):**
<b>«Серебряная экономика»: как стареющий Китай превращается в рынок для новых продуктов</b>

Демографический сдвиг в Китае формирует спрос, который ещё пять лет назад почти не рассматривался как отдельный потребительский сегмент: товары и услуги для пожилых людей — от медтеха и реабилитации до туризма и финансовых продуктов. Компании из самых разных отраслей — от бытовой техники до фармацевтики — уже перестраивают продуктовые линейки под эту аудиторию, а не рассматривают её как побочный сегмент. Для бизнеса это не благотворительность, а один из немногих сегментов внутреннего спроса, который гарантированно продолжит расти на фоне общего замедления демографии.

#GTT #GlobalTechTour #Техтуризм #СереднаяЭкономика #Китай

**Character count:** 723

**Image prompt:**
Photorealistic editorial photo of an active elderly Chinese couple using a modern tablet device in a bright comfortable home setting, warm natural lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-17-china-silver-economy-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** People's Daily Online (robotics eldercare fast track), Global Times (eldercare sector resilience, 2026).

## 2026-09-17 — GlobalTechTour — Midea overseas OBM growth (18:00, sales)
**Slug:** midea-overseas-obm-growth-2026

**Post text (HTML, ready to send):**
<b>Midea: зарубежная выручка почти 196 млрд юаней, и уже почти половина — под собственным брендом</b>

美的集团 / Midea заработал за рубежом 195,948 млрд юаней в 2025 году (+15,92% год к году), а доля зарубежного бизнеса под собственными брендами (OBM), а не по контракту для чужих марок, превысила 45% международной розничной выручки — про бытовую электронику Китая подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-appliances-expedition">по электронике и умному дому</a>. К концу 2025 года компания добавила 18 новых зарубежных производственных площадок, доведя их общее число до 63 — от контрактного производителя до владельца собственных заводов и брендов за рубежом.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Midea #БытоваяТехника

**Character count:** 745

**Image prompt:**
Photorealistic editorial photo of a modern appliance manufacturing facility exterior with company delivery trucks loading products, bright daylight, wide angle, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-17-midea-overseas-obm-growth-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-appliances-expedition (company card exists: /companies/midea, sector "electronics").

**Sources checked:** Caixin Global (Midea OBM strategy, 2025), 36kr (Midea overseas expansion 2026).

---

# 2026-09-18

## 2026-09-18 — GlobalTechTour — EV battery swap standardization (09:00, analytical)
**Slug:** china-battery-swap-standard-2026

**Post text (HTML, ready to send):**
<b>Обмен батареи вместо зарядки: китайская альтернатива заправке набирает 9000+ станций</b>

Сеть станций замены аккумуляторов для электромобилей в Китае превысила 9000 объектов по всему миру, а совокупное число операций замены батарей приближается к 110 млн — модель, альтернативная классической зарядной инфраструктуре: замена батареи занимает минуты вместо десятков минут зарядки. Ставка на этот формат остаётся дорогостоящей (речь о миллиардных инвестициях в развитие сети), но там, где она прижилась, потребители явно предпочитают её обычной быстрой зарядке для повседневного использования.

#GTT #GlobalTechTour #Техтуризм #EV #Инфраструктура

**Character count:** 660

**Image prompt:**
Photorealistic editorial photo of an automated battery swap station for electric vehicles with a car positioned for service, bright clean facility lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-18-china-battery-swap-standard-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** NIO official press release (100 million battery swaps, Feb 2026), FuelCellsWorks (9,000 stations milestone, June 2026).

## 2026-09-18 — GlobalTechTour — NIO Europe battery swap (18:00, sales)
**Slug:** nio-europe-battery-swap-2026

**Post text (HTML, ready to send):**
<b>NIO: 60 станций замены батарей уже работают в шести странах Европы</b>

蔚来 / NIO развернул 60 станций замены аккумуляторов в шести европейских странах, преимущественно в Норвегии и Германии, и рассчитывает выйти на отметку в 500 станций к концу 2026 года — про экосистему китайских электромобилей подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-auto-plants-expedition">по автозаводам Китая</a>. Компания привлекла 2,6 млрд долларов на развитие технологии замены батарей и планирует добавить ещё 1000 станций по всему миру в 2026 году — при этом рост именно европейской сети заметно замедлился после сокращения региональных инвестиций.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #NIO #EV

**Character count:** 743

**Image prompt:**
Photorealistic editorial photo of a modern NIO-style battery swap station in a European city setting with an electric car being serviced, bright daylight, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-18-nio-europe-battery-swap-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-auto-plants-expedition (company card exists: /companies/nio, sector "auto").

**Sources checked:** SCMP (NIO $2.6B battery swap bet), NIO.com Europe expansion press release.

---

# 2026-09-19

## 2026-09-19 — GlobalTechTour — Chinese condiment export growth (09:00, analytical)
**Slug:** china-condiment-export-growth-2026

**Post text (HTML, ready to send):**
<b>Соевый соус как экспортный товар: скромная доля, но растущий аппетит</b>

Мировой спрос на азиатские соусы и приправы, включая соевый соус, по прогнозам, будет расти в среднем на 7,9% в год — драйвером выступает растущий интерес западных потребителей к азиатской кулинарной культуре, особенно заметный в Европе. Пока зарубежная выручка у большинства китайских производителей приправ остаётся минимальной долей общих продаж, но именно это делает сегмент интересным: рынок ещё далёк от насыщения, а конкуренция с устоявшимися брендами вроде Kikkoman только начинается по-настоящему.

#GTT #GlobalTechTour #Техтуризм #Пищепром #Экспорт

**Character count:** 653

**Image prompt:**
Photorealistic editorial photo of glass bottles of dark soy sauce and condiments displayed on a wooden kitchen counter with fresh ingredients nearby, warm natural lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-19-china-condiment-export-growth-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** Coherent Market Insights (dark soy sauce market forecast), thebambooworks.com Haitian IPO coverage.

## 2026-09-19 — GlobalTechTour — Haitian Flavouring global push (18:00, sales)
**Slug:** haitian-flavouring-global-push-2026

**Post text (HTML, ready to send):**
<b>Haitian привлёк 1,29 млрд долларов на бирже Гонконга — и почти пятую часть направит на глобальный бренд</b>

海天味业 / Foshan Haitian Flavouring — крупнейший производитель соевого соуса и приправ в Китае — привлёк около 1,29 млрд долларов на IPO в Гонконге в 2025 году, направив порядка 20% средств на построение глобального бренда, расширение каналов сбыта и цепочки поставок за рубежом; про пищевую индустрию Китая подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-tea-coffee-retail-expedition">по чаю, кофе и ритейлу</a>. Разница в подходах к рынку и вкусовым стандартам разных стран остаётся главным барьером — компания открыто называет её основным вызовом собственной экспансии.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Haitian #Пищепром

**Character count:** 794

**Image prompt:**
Photorealistic editorial photo of a modern condiment bottling production line with glass bottles moving along a conveyor, bright clean industrial lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-19-haitian-flavouring-global-push-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tea-coffee-retail-expedition (company card exists: /companies/haitian, sector "food").

**Sources checked:** EqualOcean (Haitian HKEX listing, 2025), thebambooworks.com IPO analysis.

# 2026-09-20

## 2026-09-20 — GlobalTechTour — China pharma CDMO boom (09:00, analytical)
**Slug:** china-pharma-cdmo-boom-2026

**Post text (HTML, ready to send):**
<b>Китайские CDMO выходят в мировые лидеры контрактной фармпроизводства</b>

Контрактные производители лекарств и биопрепаратов (CDMO) из Китая последовательно наращивают долю мирового рынка — компании этого профиля сочетают более низкую себестоимость с растущей технологической базой, изначально выстроенной для внутреннего рынка. Модель, при которой китайская компания зарабатывает на производстве и разработке чужих препаратов, а не на продаже собственных лекарств, оказалась на удивление устойчивой к колебаниям спроса на конкретные молекулы — заказы поступают от десятков фармгигантов одновременно, а не от одного клиента.

#GTT #GlobalTechTour #Техтуризм #Фарма #CDMO

**Character count:** 662

**Image prompt:**
Photorealistic editorial photo of a modern pharmaceutical manufacturing cleanroom with bioreactor tanks and technicians in protective gear, bright clinical lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-20-china-pharma-cdmo-boom-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** BigGo Finance (WuXi AppTec H1 2026 results), BioSpace (WuXi AppTec Q1 2026 growth).

## 2026-09-20 — GlobalTechTour — WuXi AppTec overtakes Lonza (18:00, sales)
**Slug:** wuxi-apptec-overtakes-lonza-2026

**Post text (HTML, ready to send):**
<b>WuXi AppTec обошёл швейцарский Lonza и стал №1 в мире по контрактному производству лекарств</b>

药明康德 / WuXi AppTec заработал 28,9 млрд юаней (около 4,3 млрд долларов) выручки за первое полугодие 2026 года, впервые обойдя швейцарского конкурента Lonza и заняв первое место в мире среди CDMO-компаний, а выручка сегмента малых молекул выросла на 80,1% год к году; про биотех и фарму Китая подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-tech-giants-expedition">«Технологические гиганты Китая»</a>. На конец 2025 года зарубежные заказы составляли 68% портфеля компании, а выручка от клиентов из США достигла 31,25 млрд юаней.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #WuXiAppTec #Фарма

**Character count:** 749

**Image prompt:**
Photorealistic editorial photo of scientists in a modern pharmaceutical research lab examining molecular structure models on a large screen, bright clean lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-20-wuxi-apptec-overtakes-lonza-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tech-giants-expedition (company card exists: /companies/wuxi-apptec, sector "medtech").

**Sources checked:** BigGo Finance (WuXi AppTec overtakes Lonza, H1 2026), PRNewswire Q1 2026 results.

---

# 2026-09-21

## 2026-09-21 — GlobalTechTour — Huawei-backed smart EV ecosystem (09:00, analytical)
**Slug:** huawei-smart-ev-ecosystem-2026

**Post text (HTML, ready to send):**
<b>Huawei не делает машины сама — но определяет, как выглядит салон китайского электромобиля</b>

Модель, при которой Huawei поставляет автопроизводителям программную платформу, автопилот и мультимедийную систему, а не собственный автомобиль, стала одной из самых успешных стратегий выхода технологической компании на автомобильный рынок Китая — партнёрские бренды вроде Aito (от Seres) целятся на миллион продаж в год к 2030 году. Такая модель снимает с Huawei капиталоёмкие риски автопроизводства, при этом позволяя монетизировать разработки в области ИИ и автопилота через десятки партнёрских автоконцернов одновременно.

#GTT #GlobalTechTour #Техтуризм #Huawei #EV

**Character count:** 674

**Image prompt:**
Photorealistic editorial photo of a modern electric car interior showcasing a large touchscreen infotainment display and minimalist dashboard design, soft ambient lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-21-huawei-smart-ev-ecosystem-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** ChoZan (Seres/Aito/Huawei smart EV strategy), Reuters via Timeslive (Aito 1M sales target, April 2026).

# 2026-09-22

## 2026-09-22 — GlobalTechTour — Foreign heavy-industry FDI resilience (09:00, analytical)
**Slug:** foreign-heavy-industry-fdi-china-2026

**Post text (HTML, ready to send):**
<b>Пока часть капитала уходит из Китая, тяжёлая химия продолжает получать миллиардные инвестиции</b>

На фоне общего охлаждения интереса иностранных инвесторов к Китаю отдельные сегменты тяжёлой промышленности продолжают привлекать капитал в прежних масштабах — крупные интегрированные химические и нефтехимические комплексы остаются исключением из общего тренда. Причина простая: такие проекты строятся на горизонте 5-10 лет и завязаны на доступ к местному рынку сбыта и цепочкам поставок, которые невозможно быстро воспроизвести в другой стране — инвестор, вложивший миллиарды в стройку, не станет сворачивать проект из-за краткосрочной геополитической турбулентности.

#GTT #GlobalTechTour #Техтуризм #Инвестиции #ТяжПром

**Character count:** 725

**Image prompt:**
Photorealistic editorial photo of a massive modern petrochemical industrial complex with steam and pipelines under a clear sky, wide industrial shot, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-22-foreign-heavy-industry-fdi-china-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** company data from GlobalTechTour's own companies.json (BASF Zhanjiang Verbund record, verified against public BASF project announcements).

## 2026-09-22 — GlobalTechTour — BASF Zhanjiang Verbund (18:00, sales)
**Slug:** basf-zhanjiang-verbund-2026

**Post text (HTML, ready to send):**
<b>BASF запустил в Чжанцзяне первый в мире паровой крекинг на возобновляемой энергии</b>

BASF Zhanjiang Verbund — седьмая интегрированная производственная площадка BASF в мире и третья по величине после Людвигсхафена и Антверпена — запустила паровой крекинг в январе 2026 года, и это первая в мире подобная установка, чьи основные компрессоры работают на 100% возобновляемой электроэнергии; про промышленные кластеры юга Китая подробнее в программе <a href="https://globaltechtour.ru/expeditions/china-petrochemicals-guangdong-expedition">по нефтехимии Гуандуна</a>. Мощность по этилену — 1 млн тонн в год, инвестиции — около 8,7 млрд евро (уложились ниже первоначального бюджета), штат превышает 2000 человек.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #BASF #Нефтехимия

**Character count:** 793

**Image prompt:**
Photorealistic editorial photo of a large modern chemical plant with steam crackers and industrial towers powered by visible wind turbines in the background, bright daylight, cinematic wide shot, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-22-basf-zhanjiang-verbund-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-petrochemicals-guangdong-expedition (verified exists: tours.json tour_id "china-petrochemicals-guangdong-expedition", sector "heavy"; company card exists: /companies/basf-zhanjiang, sector "heavy").

**Sources checked:** GlobalTechTour's own companies.json record (basf-zhanjiang), consistent with public BASF Zhanjiang Verbund project announcements (steam cracker startup January 2026).

# 2026-09-23

## 2026-09-23 — GlobalTechTour — Robotics investment draws benchmarking demand (09:00, analytical)
**Slug:** china-robotics-investment-benchmarking-2026

**Post text (HTML, ready to send):**
<b>Всемирная конференция роботов в Пекине собрала рекордные 300+ компаний — и рекордный интерес зарубежного бизнеса</b>

Всемирная конференция роботов (WRC) 2026 в Пекине (19-23 августа) собрала свыше 300 компаний — на 69% больше, чем годом ранее — и более 3000 экспонатов, из них свыше 150 премьер. Для иностранного бизнеса, который хочет увидеть не рекламные ролики, а реальное производство и реальные пилотные внедрения, подобные выставки становятся точкой входа в китайскую робототехнику — компактный способ оценить масштаб отрасли за несколько дней вместо месяцев переписки с отдельными поставщиками.

#GTT #GlobalTechTour #Техтуризм #Робототехника #WRC2026

**Character count:** 660

**Image prompt:**
Photorealistic editorial photo of international business visitors examining robotic exhibits at a large trade show booth, bright convention lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-23-china-robotics-investment-benchmarking-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** robot-china.com (WRC 2026 coverage), CGTN (World Robot Conference, Aug 2026).

## 2026-09-23 — GlobalTechTour — Robotics Expedition tour (18:00, sales)
**Slug:** robotics-expedition-tour-2026

**Post text (HTML, ready to send):**
<b>Прямой доступ на производства лидеров робототехники Китая — без месяцев переговоров</b>

Пока конференции вроде WRC 2026 показывают отрасль на выставочном стенде, программа <a href="https://globaltechtour.ru/expeditions/robotics-expedition">Robotics Expedition</a> организует закрытые визиты напрямую на производственные площадки лидеров китайской робототехники в Пекине, Шанхае и Шэньчжэне — маршрут из пяти дней и двенадцати компаний, куда самостоятельно попасть практически невозможно. Это разница между просмотром демо на сцене и разговором с инженерами прямо в цехе, где рождается следующее поколение продукции.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Робототехника #БизнесТур

**Character count:** 686

**Image prompt:**
Photorealistic editorial photo of a small group of international business visitors touring a modern robotics factory floor with an engineer guide explaining equipment, bright industrial lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-23-robotics-expedition-tour-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/robotics-expedition (verified exists: tours.json tour_id "robotics-expedition", sector "robotics").

**Sources checked:** GlobalTechTour's own tours.json (robotics-expedition itinerary, 12 companies, Beijing/Shanghai/Shenzhen route).

---

# 2026-09-24

## 2026-09-24 — GlobalTechTour — Cross-border digital payments in SEA (09:00, analytical)
**Slug:** china-cross-border-payments-sea-2026

**Post text (HTML, ready to send):**
<b>Alipay в Джакарте, Ханое и Куала-Лумпуре: китайские платежи становятся региональным стандартом</b>

В 2026 году национальные QR-платёжные системы Индонезии, Малайзии, Таиланда и Вьетнама одна за другой интегрируются напрямую с китайскими платёжными платформами вроде Alipay и WeChat Pay — во Вьетнаме, например, платформа NAPAS совместно с Ant International и Vietcombank запустила трансграничные QR-платежи, позволяющие китайским туристам платить через Alipay по всей торговой сети NAPAS с автоматической конвертацией юаня в донг. Alipay+ уже принимается в более чем 220 странах и регионах мира — для бизнеса это означает, что расчёты с китайскими партнёрами и туристами в регионе становятся всё менее зависимыми от посредников.

#GTT #GlobalTechTour #Техтуризм #ЮВА #Платежи

**Character count:** 794

**Image prompt:**
Photorealistic editorial photo of a street food vendor in Southeast Asia accepting a mobile QR code payment from a customer's smartphone, warm evening market lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-24-china-cross-border-payments-sea-2026.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** SCMP (China-Indonesia cross-border QR payments), Xinhua (Indonesia-China QRIS launch, May 2026), Businesswire (Alipay+ bank partners, July 2026).

## 2026-09-24 — GlobalTechTour — China fintech giants tour (18:00, sales)
**Slug:** china-fintech-giants-tour-2026

**Post text (HTML, ready to send):**
<b>Увидеть, как устроена платёжная инфраструктура, которая уже работает в 220+ странах</b>

Платёжные экосистемы уровня Alipay строились не за один год — это результат десятилетий выстраивания инфраструктуры, регуляторных партнёрств и интеграций с банками по всему миру, и программа <a href="https://globaltechtour.ru/expeditions/china-fintech-giants-expedition">«Финтех-гиганты Китая»</a> показывает эту машину изнутри: от процессинговых центров до команд, которые ведут переговоры с зарубежными платёжными системами. Для тех, кто работает с трансграничными расчётами или планирует выход на азиатские рынки, это редкая возможность увидеть логику таких партнёрств из первых рук.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Финтех #БизнесТур

**Character count:** 703

**Image prompt:**
Photorealistic editorial photo of a modern fintech company office with a large screen displaying global payment transaction flows, professionals discussing near the display, bright office lighting, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-24-china-fintech-giants-tour-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-fintech-giants-expedition (verified exists: tours.json tour_id "china-fintech-giants-expedition", sector "finance").

**Sources checked:** GlobalTechTour's own tours.json (china-fintech-giants-expedition itinerary).

---

# 2026-09-25

## 2026-09-25 — GlobalTechTour — Half-year China business scorecard (09:00, analytical)
**Slug:** china-business-2026-mid-year-scorecard

**Post text (HTML, ready to send):**
<b>Полугодовой счёт китайского бизнеса: от 45 000 машин XPeng за рубежом до 32 000 экспонентов на Canton Fair</b>

Первая половина 2026 года дала china-watcher'ам необычно плотный поток данных: XPeng нарастил зарубежные поставки на 96% за год, WuXi AppTec обошёл швейцарский Lonza в контрактной фарме, Midea заработал за рубежом почти 196 млрд юаней, а Canton Fair собрала 32 000 экспонентов при заметном сдвиге в сторону робототехники. Общий знаменатель у всех этих историй один: китайские компании во всё большем числе отраслей перестают быть просто экспортёрами дешёвых товаров и превращаются в игроков с собственными брендами, локальным производством за рубежом и растущей рыночной властью.

#GTT #GlobalTechTour #Техтуризм #Итоги #Китай

**Character count:** 780

**Image prompt:**
Photorealistic editorial photo of a diverse montage-style scene showing a modern factory, a shipping port, and a retail storefront in soft transition lighting, cinematic wide shot, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-25-china-business-2026-mid-year-scorecard.png

**Internal link target:** none (analytical 09:00 slot).

**Sources checked:** recap of previously verified sources from this batch (CnEVPost XPeng, BigGo Finance WuXi AppTec, Caixin Midea, CGTN Canton Fair).

## 2026-09-25 — GlobalTechTour — China Tech Giants tour wrap-up (18:00, sales)
**Slug:** china-tech-giants-tour-wrapup-2026

**Post text (HTML, ready to send):**
<b>Один маршрут — весь спектр китайского технологического бизнеса</b>

От облачной инфраструктуры Alibaba Cloud до платёжных систем, от полупроводниковых фабрик до экосистемы коротких видео — весь этот срез китайского бизнеса собран в одном маршруте программы <a href="https://globaltechtour.ru/expeditions/china-tech-giants-expedition">«Технологические гиганты Китая»</a>, где встречи организованы напрямую с компаниями, а не через посредников. Осенний сезон — удачное время для визита: деловая активность после летнего затишья восстанавливается, а именно в этот период проходят и крупные отраслевые выставки вроде осенней сессии Canton Fair.

🔗 https://globaltechtour.ru/ — программы туров

#GTT #GlobalTechTour #Техтуризм #Технологии #БизнесТур

**Character count:** 693

**Image prompt:**
Photorealistic editorial photo of a small group of international business travelers being welcomed at a modern Chinese tech company headquarters entrance, bright daylight, cinematic color grading, high detail. No text, no logos, no brand names, no watermarks anywhere in the image.

**Image URL:** https://raw.githubusercontent.com/Ostap-87/sinotech/main/public/tg-media/2026-09-25-china-tech-giants-tour-wrapup-2026.png

**Internal link target:** https://globaltechtour.ru/expeditions/china-tech-giants-expedition (verified exists: tours.json tour_id "china-tech-giants-expedition", sector "flagship").

**Sources checked:** GlobalTechTour's own tours.json (china-tech-giants-expedition itinerary), Canton Fair official autumn 2026 schedule (Oct 15 – Nov 4).
