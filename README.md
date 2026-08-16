# MiraMoney — Frontend веб-приложение для трансграничных денежных переводов

Современный, быстрый, адаптивный frontend-сервис международных денежных переводов **MiraMoney**, разработанный в 100% Pixel-Perfect соответствии с дизайн-макетом Figma ([Transgran_v1](https://www.figma.com/design/nsdTgXzFHs4Ng2KG5jBpBO/Transgran_v1?node-id=0-1)).

---

## 🚀 Стек технологий

- **Фреймворк**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Библиотека UI**: React 19
- **Язык**: TypeScript (строгая типизация)
- **Стилизация**: Tailwind CSS (полная палитра дизайн-токенов из Figma)
- **Иконки**: Lucide React + векторные и растровые ассеты из Figma

---

## 📦 Быстрый старт и запуск

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск локального сервера разработки
```bash
npm run dev
```
Приложение откроется по адресу [http://localhost:3000](http://localhost:3000).

### 3. Сборка для production
```bash
npm run build
npm run start
```

---

## 📂 Подробная структура всех файлов проекта

Ниже приведено полное описание всех файлов проекта для удобной работы команды разработки:

### 1. Корневые файлы конфигурации
- [`package.json`](./package.json) — конфигурация зависимостей (`next`, `react`, `lucide-react`, `tailwindcss`), скриптов сборки (`dev`, `build`, `start`, `lint`).
- [`tsconfig.json`](./tsconfig.json) — настройки компилятора TypeScript с алиасом `@/*` на папку `src/*`.
- [`tailwind.config.ts`](./tailwind.config.ts) — конфигурация Tailwind CSS: точные цвета проекта (`#0D8C47`, `#0A4024`, `#14171C`, `#F7FAFC` и др.), шрифты, радиусы и тени.
- [`postcss.config.mjs`](./postcss.config.mjs) — настройки PostCSS для компиляции Tailwind.
- [`next.config.ts`](./next.config.ts) — настройки сборщика Next.js.
- [`.env.example`](./.env.example) — пример переменных окружения для подключения к API.
- [`.gitignore`](./.gitignore) — список исключений для Git (node_modules, .next, .env, build-артефакты).

---

### 2. Слой данных и типов (`src/types/`, `src/data/`)
- [`src/types/index.ts`](./src/types/index.ts) — строгие контракты TypeScript для всех сущностей сервиса:
  - `Currency` — модель валюты (код, наименование, символ, флаг).
  - `CountryDirection` — модель направления перевода (страна, курс, лимиты, способы получения, банки).
  - `TransferCalculation` — модель расчета суммы перевода и комиссии.
  - `UserAccount` — модель профиля пользователя.
  - `TransactionRecord` — модель транзакции в истории переводов.
  - `LegalDocument` — модель правового документа со статьями.
  - `FAQItem`, `Review`, `NavLink` — вспомогательные интерфейсы.
- [`src/data/mockData.ts`](./src/data/mockData.ts) — централизованные фикстуры данных:
  - `SUPPORTED_CURRENCIES` — список валют (RUB, UZS, CNY, BYN, KGS, TJS, USD, EUR).
  - `COUNTRY_DIRECTIONS` — список направлений перевода с реальными курсами и лимитами.
  - `CURRENT_USER` — моковые данные авторизованного пользователя (*Иван Иванов*).
  - `MOCK_TRANSACTIONS` — список завершенных и отмененных транзакций для истории.
  - `LEGAL_DOCUMENTS` — полные тексты 4 правовых документов (Политика конфиденциальности, Cookie, Пользовательское соглашение, Персональные данные).
  - `FAQ_ITEMS` и `REVIEWS` — справочные материалы и отзывы.

---

### 3. Маршруты страниц (`src/app/`)
- [`src/app/layout.tsx`](./src/app/layout.tsx) — корневой layout приложения (подключение шрифта Inter, метатеги, базовые стили).
- [`src/app/page.tsx`](./src/app/page.tsx) — главная страница лендинга: Hero с калькулятором, направления, шаги, преимущества, отзывы, FAQ.
- [`src/app/transfer/page.tsx`](./src/app/transfer/page.tsx) — экран пошагового мастера оформления перевода (`TransferWizard`).
- [`src/app/dashboard/page.tsx`](./src/app/dashboard/page.tsx) — личный кабинет пользователя (`DashboardLayout`).
- [`src/app/profile/page.tsx`](./src/app/profile/page.tsx) — алиас-роут для перехода в личный кабинет.
- [`src/app/register/page.tsx`](./src/app/register/page.tsx) — экран регистрации и авторизации по номеру телефона.
- [`src/app/globals.css`](./src/app/globals.css) — глобальные стили, кастомные анимации и токены.

---

### 4. Функциональные компоненты (`src/components/features/`)

#### 4.1. Калькулятор и выбор валют (`src/components/features/calculator/`)
- [`CurrencyCalculator.tsx`](./src/components/features/calculator/CurrencyCalculator.tsx) — интерактивный калькулятор перевода в реальном времени с двунаправленным пересчетом курса и выбором валют.
- [`CurrencySelectorModal.tsx`](./src/components/features/calculator/CurrencySelectorModal.tsx) — попап выбора валюты (модальное окно на Desktop `#107:208` и выездной Bottom Sheet на Mobile `#107:812`).

#### 4.2. Сценарий оформления перевода (`src/components/features/transfer/`)
- [`TransferWizard.tsx`](./src/components/features/transfer/TransferWizard.tsx) — 6 шагов оформления перевода:
  - **Шаг 1**: Выбор направления, ввод суммы и расчет.
  - **Шаг 2**: Выбор банка получателя (табы: *Все*, *На карту*, *По телефону*).
  - **Шаг 3**: Ввод реквизитов получателя (+998 телефон, имя и фамилия латиницей).
  - **Шаг 4**: Выбор банка списания отправителя.
  - **Шаг 5**: Проверка деталей перевода, фиксация курса и таймер обратного отсчета.
  - **Шаг 6**: Статус обработки и подтверждение создания заявки.

#### 4.3. Личный кабинет пользователя (`src/components/features/profile/`)
- [`DashboardLayout.tsx`](./src/components/features/profile/DashboardLayout.tsx) — общий контейнер ЛК с десктопным сайдбаром и мобильным таббаром (`#22:1331`).
- [`ProfileSidebar.tsx`](./src/components/features/profile/ProfileSidebar.tsx) — десктопный сайдбар (`#5:3`): логотип MiraMoney, аватар, имя, телефон и 8 пунктов навигации.
- [`ProfileTab.tsx`](./src/components/features/profile/ProfileTab.tsx) — экран «Профиль» (`#5:2` / `#20:1300`): личные данные, статус верификации и быстрые ссылки.
- [`HistoryTab.tsx`](./src/components/features/profile/HistoryTab.tsx) — экран «История переводов» (`#8:63` / `#22:1344`) + экран **«Детали перевода»** (`#22:1603`) с возможностью повтора.
- [`VerificationTab.tsx`](./src/components/features/profile/VerificationTab.tsx) — экран «Верификация» (`#8:154` / `#22:1397`): пошаговый гайд и зона загрузки документов.
- [`LimitsTab.tsx`](./src/components/features/profile/LimitsTab.tsx) — экран «Лимиты» (`#8:226` / `#22:1430`): лимиты для резидентов и нерезидентов.
- [`SecurityTab.tsx`](./src/components/features/profile/SecurityTab.tsx) — экран «Безопасность» (`#8:389` / `#22:1511`): 2FA, сессии и ссылки.
- [`SettingsTab.tsx`](./src/components/features/profile/SettingsTab.tsx) — экран «Настройки» (`#8:298` / `#22:1464`): выбор основной валюты через попап, язык, переключатели уведомлений и контакты поддержки.
- [`DocumentsTab.tsx`](./src/components/features/profile/DocumentsTab.tsx) — экран «Документы» (`#8:458` / `#22:1555`): список документов со ссылками и полноэкранный режим чтения статей (`#107:239` / `#107:841`).

#### 4.4. Секции лендинга (`src/components/features/landing/`)
- [`HeroSection.tsx`](./src/components/features/landing/HeroSection.tsx) — главный баннер лендинга с калькулятором.
- [`DirectionsSection.tsx`](./src/components/features/landing/DirectionsSection.tsx) — карточки поддерживаемых стран (Узбекистан, Китай, Беларусь, Азербайджан, Армения, Таджикистан, Кыргызстан).
- [`HowItWorksSection.tsx`](./src/components/features/landing/HowItWorksSection.tsx) — 4 простых шага осуществления перевода.
- [`AdvantagesSection.tsx`](./src/components/features/landing/AdvantagesSection.tsx) — ключевые преимущества (0% комиссия, безопасность, мгновенное зачисление).
- [`FAQSection.tsx`](./src/components/features/landing/FAQSection.tsx) — интерактивный аккордеон ответов на частые вопросы.
- [`ReviewsSection.tsx`](./src/components/features/landing/ReviewsSection.tsx) — отзывы реальных клиентов.

---

### 5. Общие компоненты макета и UI (`src/components/layout/`, `src/components/ui/`)
- [`Header.tsx`](./src/components/layout/Header.tsx) — шапка лендинга с навигацией, логотипом и кнопкой входа / регистрации.
- [`Footer.tsx`](./src/components/layout/Footer.tsx) — подвал сайта с правовой информацией и контактами.
- [`MobileMenu.tsx`](./src/components/layout/MobileMenu.tsx) — выездное меню для мобильных экранов.
- [`Accordion.tsx`](./src/components/ui/Accordion.tsx) — доступный переиспользуемый компонент аккордеона.
- [`Modal.tsx`](./src/components/ui/Modal.tsx) — универсальное модальное окно.

---

### 6. Статические ассеты (`public/`)
- `public/images/logo.png` — оригинальный векторный логотип MiraMoney.
- `public/images/flag_uz.png`, `flag_cn.png`, `flag_by.png`, `flag_ru.png`, `flag_tj.png`, `flag_kg.png`, `flag_az.png`, `flag_am.png` — официальные флаги стран из Figma.

---

## 🌿 Git-ветки и доставка

- Ветка разработки: `develop`
- Продакшн-ветка: `main`
- Удаленный репозиторий: `git@github.com:daredevil666l/mirasite.git`
