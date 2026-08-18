import {
  CountryDirection,
  Currency,
  FAQItem,
  NavLink,
  Review,
  DocumentFormatConfig,
  SystemMessageConfig,
} from "@/types";
import { getAssetPath } from "@/lib/utils";

/**
 * Навигационные ссылки хедера
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Как это работает", href: "#how-it-works" },
  { label: "Направления", href: "#directions" },
  { label: "Тарифы", href: "#advantages" },
  { label: "Вопросы", href: "#faq" },
];

/**
 * Список поддерживаемых валют (из макета поп-апа выбора валюты)
 */
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "UZS", name: "Узбекский сум", symbol: "UZS", flag: getAssetPath("/images/flag_uz.png") },
  { code: "CNY", name: "Китайский юань", symbol: "¥", flag: getAssetPath("/images/flag_cn.png") },
  { code: "BYN", name: "Белорусский рубль", symbol: "Br", flag: getAssetPath("/images/flag_by.png") },
  { code: "RUB", name: "Российский рубль", symbol: "₽", flag: getAssetPath("/images/flag_ru.png") },
  { code: "KGS", name: "Кыргызский сом", symbol: "KGS", flag: getAssetPath("/images/flag_kg.png") },
  { code: "TJS", name: "Таджикский сомони", symbol: "TJS", flag: getAssetPath("/images/flag_tj.png") },
  { code: "USD", name: "Доллар США", symbol: "$", flag: getAssetPath("/images/flag_ru.png") },
  { code: "EUR", name: "Евро", symbol: "€", flag: getAssetPath("/images/flag_by.png") },
];

/**
 * Направления переводов из макета Figma
 */
export const COUNTRY_DIRECTIONS: CountryDirection[] = [
  {
    id: "uz",
    name: "Узбекистан",
    currencyCode: "UZS",
    currencyName: "Узбекский сум",
    rate: 153.66, // 1 RUB = 153.66 UZS из макета
    flagUrl: getAssetPath("/images/flag_uz.png"),
    minAmountRUB: 100,
    maxAmountRUB: 600000,
    methods: ["По номеру телефона", "На карту Uzcard/Humo", "По банковским реквизитам"],
    banks: ["Aloqabank", "Kapitalbank", "Ipak Yoli Bank", "TBC Bank", "NBU"],
  },
  {
    id: "cn",
    name: "Китай",
    currencyCode: "CNY",
    currencyName: "Китайский юань",
    rate: 0.082, // 1 RUB = 0.082 CNY
    flagUrl: getAssetPath("/images/flag_cn.png"),
    minAmountRUB: 1000,
    maxAmountRUB: 600000,
    methods: ["Alipay", "WeChat Pay", "UnionPay"],
    banks: ["Bank of China", "ICBC", "CCB"],
  },
  {
    id: "by",
    name: "Беларусь",
    currencyCode: "BYN",
    currencyName: "Белорусский рубль",
    rate: 0.038, // 1 RUB = 0.038 BYN
    flagUrl: getAssetPath("/images/flag_by.png"),
    minAmountRUB: 100,
    maxAmountRUB: 600000,
    methods: ["На карту БЕЛКАРТ/МИР", "По номеру телефона", "На банковский счет"],
    banks: ["Беларусбанк", "Приорбанк", "Альфа-Банк РБ"],
  },
  {
    id: "ru",
    name: "Россия",
    currencyCode: "RUB",
    currencyName: "Российский рубль",
    rate: 1.0,
    flagUrl: getAssetPath("/images/flag_ru.png"),
    minAmountRUB: 100,
    maxAmountRUB: 600000,
    methods: ["СБП", "На карту МИР/любого банка", "По реквизитам счета"],
    banks: ["Сбербанк", "Т-Банк", "ВТБ", "Альфа-Банк"],
  },
  {
    id: "kg",
    name: "Кыргызстан",
    currencyCode: "KGS",
    currencyName: "Кыргызский сом",
    rate: 0.98, // 1 RUB = 0.98 KGS
    flagUrl: getAssetPath("/images/flag_kg.png"),
    minAmountRUB: 100,
    maxAmountRUB: 600000,
    methods: ["Элкарт", "По номеру телефона", "МБанк", "О!Деньги"],
    banks: ["MBANK", "Оптима Банк", "Бакай Банк"],
  },
  {
    id: "tj",
    name: "Таджикистан",
    currencyCode: "TJS",
    currencyName: "Таджикский сомони",
    rate: 0.12, // 1 RUB = 0.12 TJS
    flagUrl: getAssetPath("/images/flag_tj.png"),
    minAmountRUB: 100,
    maxAmountRUB: 600000,
    methods: ["Корти Милли", "По номеру телефона", "Душанбе Сити", "Алиф"],
    banks: ["Алиф Банк", "Душанбе Сити", "Эсхата"],
  },
];

/**
 * Преимущества из макета Figma
 */
export const ADVANTAGES = [
  {
    id: "rate",
    title: "Выгодный курс",
    description: "Курс обновляется в реальном времени и всегда ближе к межбанковскому",
    icon: "TrendingUp",
  },
  {
    id: "experience",
    title: "Наш опыт",
    description: "Тысячи успешных переводов и стабильно растущий курс доверия клиентов",
    icon: "ShieldCheck",
  },
  {
    id: "instant",
    title: "Мгновенное зачисление",
    description: "Получатель видит деньги на счету в течение нескольких минут",
    icon: "Zap",
  },
  {
    id: "safety",
    title: "Гарантия безопасности транзакций",
    description: "Шифрование данных на всех этапах перевода, соответствие требованиям 152-ФЗ",
    icon: "Lock",
  },
];

/**
 * Способы перевода
 */
export const TRANSFER_WAYS = [
  "По номеру телефона",
  "На карту",
  "По банковским реквизитам",
  "Наличными в пункте выдачи",
];

/**
 * Шаги перевода ("Как отправить перевод?")
 */
export const HOW_TO_STEPS = [
  {
    stepNumber: 1,
    title: "Зарегистрируйтесь",
    description: "Укажите номер телефона и подтвердите его кодом из SMS",
  },
  {
    stepNumber: 2,
    title: "Оформите перевод",
    description: "Выберите страну, сумму и способ получения денег",
  },
  {
    stepNumber: 3,
    title: "Получите деньги",
    description: "Получатель увидит деньги уже в течение нескольких минут",
  },
];

/**
 * Часто задаваемые вопросы (FAQ)
 */
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Как долго идёт перевод?",
    answer: "В большинстве направлений (Узбекистан, Кыргызстан, Таджикистан, Беларусь) переводы на банковские карты и по номеру телефона зачисляются мгновенно или в течение 1–5 минут. В редких случаях межбанковская обработка может занимать до 24 часов.",
  },
  {
    id: "faq-2",
    question: "Какая комиссия за перевод?",
    answer: "В сервисе MiraMoney действует специальный тариф: комиссия за перевод составляет 0 ₽. Мы фиксируем прозрачный курс без скрытых списаний и дополнительных комиссий посредников.",
  },
  {
    id: "faq-3",
    question: "Нужна ли верификация для перевода?",
    answer: "Для небольших переводов достаточно подтвердить номер телефона. Для увеличения лимитов в соответствии с требованиями законодательства РФ (115-ФЗ и 152-ФЗ) потребуется простая быстрая верификация по паспорту в личном кабинете.",
  },
  {
    id: "faq-4",
    question: "Что делать, если перевод не пришёл?",
    answer: "Если средства не поступили в течение 15 минут, проверьте правильность введенных реквизитов получателя в личном кабинете. Наша служба круглосуточной поддержки оперативно поможет уточнить статус операции в банке-получателе.",
  },
  {
    id: "faq-5",
    question: "Какие способы получения доступны?",
    answer: "Доступны переводы по номеру телефона (СБП и локальные сервисы), прямые зачисления на национальные и международные карты (Uzcard, Humo, Корти Милли, Элкарт, БЕЛКАРТ, МИР), а также перевод по банковским реквизитам.",
  },
];

/**
 * Отзывы клиентов
 */
export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Марат Т.",
    text: "«Перевёл маме в Баку за 5 минут, курс оказался выгоднее, чем в банке»",
    destination: "Азербайджан",
  },
  {
    id: "rev-2",
    author: "Динара С.",
    text: "«Удобное приложение, поддержка отвечает быстро, всё прозрачно»",
    destination: "Узбекистан",
  },
  {
    id: "rev-3",
    author: "Бахтиёр А.",
    text: "«Пользуюсь каждый месяц для переводов в Ташкент, ни разу проблем не было»",
    destination: "Узбекистан",
  },
];

/**
 * Текущий авторизованный пользователь
 */
export const CURRENT_USER: import("@/types").UserAccount = {
  id: "user-1",
  fullName: "Иван Иванов",
  phone: "+7 900 xxx-xx-89",
  email: "druxxxxx1981@gmail.com",
  isPhoneVerified: true,
  isEmailVerified: true,
  isKycVerified: false,
  preferredCurrency: "RUB",
  language: "ru",
};

/**
 * История транзакций пользователя
 */
export const MOCK_TRANSACTIONS: import("@/types").TransactionRecord[] = [
  {
    id: "tx-1",
    date: "15.06.2025",
    amountSend: "1 200 RUB",
    amountReceive: "184 800 UZS",
    country: "Азербайджан",
    recipient: "Аскеров Асиф",
    requisites: "Hamkorbank, номер телефона +998 97 123 45 67",
    status: "success",
    statusText: "Успешно",
  },
  {
    id: "tx-2",
    date: "14.03.2025",
    amountSend: "3 000 RUB",
    amountReceive: "246 CNY",
    country: "Армения",
    recipient: "Барсегян Армен",
    requisites: "Alipay, номер телефона +7 900 321 44 55",
    status: "failed",
    statusText: "Отказ",
  },
  {
    id: "tx-3",
    date: "02.01.2025",
    amountSend: "5 000 RUB",
    amountReceive: "768 300 UZS",
    country: "Узбекистан",
    recipient: "Каримов Шерзод",
    requisites: "Aloqabank, карта 8600 1234 5678 9012",
    status: "success",
    statusText: "Успешно",
  },
];

/**
 * Юридические документы
 */
export const LEGAL_DOCUMENTS: import("@/types").LegalDocument[] = [
  {
    id: "privacy",
    title: "Политика конфиденциальности",
    updatedAt: "Обновлено 15 января 2026",
    sections: [
      {
        title: "1. Общие положения",
        text: "Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервиса MiraMoney. Используя сервис, пользователь соглашается с условиями настоящей Политики.",
      },
      {
        title: "2. Какие данные мы собираем",
        text: "Мы собираем номер телефона, адрес электронной почты, данные документов, удостоверяющих личность, а также сведения о совершённых переводах, необходимые для оказания услуг и соблюдения требований законодательства.",
      },
      {
        title: "3. Как мы используем данные",
        text: "Персональные данные используются для проведения переводов, идентификации пользователя, предотвращения мошенничества и информирования о статусе операций. Мы не передаём данные третьим лицам, за исключением случаев, предусмотренных законодательством.",
      },
      {
        title: "4. Хранение и защита данных",
        text: "Данные хранятся на защищённых серверах с применением шифрования в соответствии с требованиями 152-ФЗ «О персональных данных». Доступ к данным имеют только уполномоченные сотрудники.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Политика файлов cookie",
    updatedAt: "Обновлено 15 января 2026",
    sections: [
      {
        title: "1. Что такое файлы cookie",
        text: "Файлы cookie — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя при посещении сервиса MiraMoney и позволяют запоминать настройки и повышать удобство использования.",
      },
      {
        title: "2. Какие cookie мы используем",
        text: "Мы используем обязательные cookie для работы сервиса, аналитические — для оценки посещаемости, а также функциональные cookie, которые запоминают язык интерфейса и валюту по умолчанию.",
      },
      {
        title: "3. Как управлять cookie",
        text: "Вы можете отключить cookie в настройках браузера, однако это может ограничить работу некоторых функций сервиса, включая автоматическую авторизацию и сохранение параметров перевода.",
      },
      {
        title: "4. Изменения политики",
        text: "Мы можем обновлять данную Политику. Актуальная версия всегда доступна в разделе «Документы» личного кабинета.",
      },
    ],
  },
  {
    id: "terms",
    title: "Пользовательское соглашение",
    updatedAt: "Обновлено 15 января 2026",
    sections: [
      {
        title: "1. Предмет соглашения",
        text: "Настоящее соглашение регулирует порядок использования сервиса MiraMoney для осуществления денежных переводов и устанавливает права и обязанности пользователя и компании.",
      },
      {
        title: "2. Права и обязанности сторон",
        text: "Пользователь обязуется предоставлять достоверные данные и не использовать сервис в противоправных целях. Компания обязуется обеспечивать доступность сервиса и сохранность средств пользователя.",
      },
      {
        title: "3. Порядок совершения переводов",
        text: "Переводы совершаются после успешной идентификации пользователя и подтверждения суммы перевода. Курс обмена фиксируется на момент подтверждения операции и действует ограниченное время.",
      },
      {
        title: "4. Ответственность сторон",
        text: "Компания не несёт ответственности за задержки перевода по вине банков-партнёров или систем денежных переводов. Пользователь несёт ответственность за точность указанных реквизитов получателя.",
      },
    ],
  },
  {
    id: "personal_data",
    title: "Обработка персональных данных",
    updatedAt: "Обновлено 15 января 2026",
    sections: [
      {
        title: "1. Цели обработки данных",
        text: "Персональные данные обрабатываются в целях исполнения договора оказания услуг перевода денежных средств, идентификации пользователя и информирования о статусе операций.",
      },
      {
        title: "2. Правовые основания обработки",
        text: "Обработка данных осуществляется в соответствии с Федеральным законом №152-ФЗ «О персональных данных» на основании согласия пользователя, полученного при регистрации в сервисе.",
      },
      {
        title: "3. Сроки хранения данных",
        text: "Персональные данные хранятся в течение срока, необходимого для оказания услуг, а также в течение сроков, установленных законодательством для хранения финансовой документации.",
      },
      {
        title: "4. Права субъекта персональных данных",
        text: "Пользователь вправе запросить доступ к своим персональным данным, их уточнение, блокирование или уничтожение, обратившись в службу поддержки MiraMoney.",
      },
    ],
  },
];

/**
 * Справочник форматов и масок национальных документов по странам
 */
export const DOCUMENT_FORMATS: DocumentFormatConfig[] = [
  {
    countryCode: "ru",
    countryName: "Россия",
    docTypeName: "Паспорт гражданина РФ",
    seriesNumberPlaceholder: "0000 000000",
    seriesNumberMask: "9999 999999",
    seriesNumberRegex: "^\\d{4}\\s?\\d{6}$",
    hasExpiryDate: false,
    expiryValidationRule: "any",
    examples: ["4510 123456", "4608 987654"],
  },
  {
    countryCode: "uz",
    countryName: "Узбекистан",
    docTypeName: "ID-карта / Биометрический паспорт",
    seriesNumberPlaceholder: "AA 1234567",
    seriesNumberMask: "AA 9999999",
    seriesNumberRegex: "^[A-Za-z]{2}\\s?\\d{7}$",
    hasExpiryDate: true,
    expiryValidationRule: "future_date",
    examples: ["FA 1234567", "AB 7654321"],
  },
  {
    countryCode: "tj",
    countryName: "Таджикистан",
    docTypeName: "ID-карта / Заграничный паспорт",
    seriesNumberPlaceholder: "A 12345678",
    seriesNumberMask: "A 99999999",
    seriesNumberRegex: "^[A-Za-z]{1,2}\\s?\\d{7,8}$",
    hasExpiryDate: true,
    expiryValidationRule: "future_date",
    examples: ["A 12345678", "TJ 9876543"],
  },
  {
    countryCode: "kg",
    countryName: "Кыргызстан",
    docTypeName: "ID-карта / Паспорт гражданина КР",
    seriesNumberPlaceholder: "ID 1234567",
    seriesNumberMask: "AA 9999999",
    seriesNumberRegex: "^[A-Za-z]{2}\\s?\\d{7}$",
    hasExpiryDate: true,
    expiryValidationRule: "future_date",
    examples: ["ID 1234567", "AN 7654321"],
  },
  {
    countryCode: "by",
    countryName: "Беларусь",
    docTypeName: "Паспорт / ID-карта РБ",
    seriesNumberPlaceholder: "AB 1234567",
    seriesNumberMask: "AA 9999999",
    seriesNumberRegex: "^[A-Za-z]{2}\\s?\\d{7}$",
    hasExpiryDate: true,
    expiryValidationRule: "future_date",
    examples: ["MP 1234567", "AB 2345678"],
  },
  {
    countryCode: "cn",
    countryName: "Китай",
    docTypeName: "ID-карта гражданина КНР / Паспорт",
    seriesNumberPlaceholder: "18-значный ID / Паспорт",
    seriesNumberRegex: "^[A-Za-z0-9]{8,18}$",
    hasExpiryDate: true,
    expiryValidationRule: "future_date",
    examples: ["110101199003072345", "E12345678"],
  },
];

/**
 * Справочник системных сообщений, текстов ошибок и отказов
 */
export const SYSTEM_MESSAGES: SystemMessageConfig[] = [
  {
    code: "AUTH_SMS_CODE_SENT",
    type: "info",
    title: "Код отправлен",
    message: "Код подтверждения отправлен в SMS на указанный номер телефона.",
  },
  {
    code: "AUTH_INVALID_CODE",
    type: "error",
    title: "Неверный код",
    message: "Введён неверный проверочный код. Проверьте SMS и повторите ввод.",
  },
  {
    code: "AUTH_CODE_EXPIRED",
    type: "error",
    title: "Срок действия кода истёк",
    message: "Время действия SMS-кода истекло. Запросите новый код через форму.",
  },
  {
    code: "AUTH_TOO_MANY_ATTEMPTS",
    type: "rejection",
    title: "Слишком много попыток",
    message: "Превышено количество попыток ввода. Повторите попытку через 15 минут.",
  },
  {
    code: "KYC_DOC_EXPIRED",
    type: "rejection",
    title: "Истёк срок действия документа",
    message: "Срок действия указанного документа удостоверения личности истёк. Укажите актуальный документ.",
  },
  {
    code: "KYC_INVALID_DOC_FORMAT",
    type: "error",
    title: "Неверный формат документа",
    message: "Серия или номер документа не соответствуют стандарту выбранного государства.",
  },
  {
    code: "TRANSFER_LIMIT_EXCEEDED",
    type: "rejection",
    title: "Превышен лимит перевода",
    message: "Сумма перевода превышает допустимый лимит для вашего уровня верификации. Пройдите верификацию для повышения лимитов.",
  },
  {
    code: "TRANSFER_EXCHANGE_RATE_EXPIRED",
    type: "warning",
    title: "Курс обновился",
    message: "Время фиксации курса истекло. Курс пересчитан по актуальному тарифу.",
  },
  {
    code: "PROFILE_CONTACT_UPDATED",
    type: "info",
    title: "Данные обновлены",
    message: "Контактные данные успешно обновлены и подтверждены.",
  },
];


