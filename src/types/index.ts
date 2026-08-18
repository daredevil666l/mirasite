/**
 * Типы и интерфейсы данных для сервиса MiraMoney
 */

export interface Currency {
  code: string;           // Трехбуквенный код валюты (RUB, UZS, CNY и др.)
  name: string;           // Полное русскоязычное наименование валюты
  symbol: string;         // Символ валюты (₽, UZS, ¥ и др.)
  flag?: string;          // Путь к изображению флага
}

export interface CountryDirection {
  id: string;             // Идентификатор страны (uz, cn, by, ru, kg, tj)
  name: string;           // Название страны на русском
  currencyCode: string;   // Валюта получения
  currencyName: string;   // Название валюты
  rate: number;           // Курс обмена: 1 RUB = rate [currency]
  flagUrl: string;        // Путь к флагу в public/images
  minAmountRUB: number;   // Минимальная сумма отправки
  maxAmountRUB: number;   // Максимальная сумма отправки
  methods: string[];      // Доступные способы получения (по номеру телефона, на карту, счет)
  banks?: string[];       // Популярные банки направления
}

export interface TransferCalculation {
  sendAmount: number;         // Сумма отправления в RUB
  sendCurrency: string;       // Валюта отправления (RUB)
  receiveAmount: number;      // Сумма получения
  receiveCurrency: string;    // Валюта получения
  exchangeRate: number;       // Применяемый курс
  fee: number;                // Комиссия в рублях (0 при акции)
  countryId: string;          // Выбранное направление
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  destination?: string;
  rating?: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isKycVerified: boolean;
  preferredCurrency: string;
  language: "ru" | "en";
}

export interface TransactionRecord {
  id: string;
  date: string;
  amountSend: string;
  amountReceive: string;
  country: string;
  recipient: string;
  requisites: string;
  status: "success" | "failed" | "pending";
  statusText: string;
}

export interface LimitCategory {
  title: string;
  thresholds: {
    level: string;
    amountLimit: string;
  }[];
}

export interface LegalDocument {
  id: string;
  title: string;
  updatedAt: string;
  sections: {
    title: string;
    text: string;
  }[];
}

export interface DocumentFormatConfig {
  countryCode: string;
  countryName: string;
  docTypeName: string;
  seriesNumberPlaceholder: string;
  seriesNumberMask?: string;
  seriesNumberRegex: string;
  hasExpiryDate: boolean;
  expiryValidationRule?: "future_date" | "any";
  examples: string[];
}

export interface SystemMessageConfig {
  code: string;
  type: "error" | "rejection" | "info" | "warning";
  title: string;
  message: string;
}

export interface AuthSendCodePayload {
  phone: string;
}

export interface AuthSendCodeResponse {
  success: boolean;
  message: string;
  retryAfterSeconds: number;
}

export interface AuthVerifyCodeResponse {
  token: string;
  user: UserAccount;
  isNewUser: boolean;
}

export interface RegisterPayload {
  phone: string;
  citizenship: string;
  surname: string;
  name: string;
  docNumber: string;
  docExpiryDate?: string;
  addressCountry: string;
  addressCity: string;
  addressStreet?: string;
  addressHouse?: string;
  agreePersonalData: boolean;
  agreeServiceRules: boolean;
}

export interface UpdateContactResponse {
  success: boolean;
  message: string;
}


