import {
  Currency,
  CountryDirection,
  TransferCalculation,
  UserAccount,
  TransactionRecord,
  LegalDocument,
  FAQItem,
  Review,
  DocumentFormatConfig,
  SystemMessageConfig,
  AuthSendCodeResponse,
  AuthVerifyCodeResponse,
  RegisterPayload,
  UpdateContactResponse,
} from "@/types";
import {
  SUPPORTED_CURRENCIES,
  COUNTRY_DIRECTIONS,
  CURRENT_USER,
  MOCK_TRANSACTIONS,
  LEGAL_DOCUMENTS,
  FAQ_ITEMS,
  REVIEWS,
  DOCUMENT_FORMATS,
  SYSTEM_MESSAGES,
} from "@/data/mockData";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Универсальный HTTP клиент для будущей интеграции с REST/GraphQL бэкендом
 */
async function fetchClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Если задан базовый URL бэкенда, выполняем реальный сетевой запрос
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error [${res.status}]: ${res.statusText}`);
    }

    return res.json();
  }

  throw new Error("No API Base URL configured. Using mock data.");
}

/**
 * 1. Получение списка поддерживаемых валют
 */
export async function getSupportedCurrencies(): Promise<Currency[]> {
  try {
    return await fetchClient<Currency[]>("/currencies");
  } catch {
    return SUPPORTED_CURRENCIES;
  }
}

/**
 * 2. Получение списка направлений переводов с актуальными курсами
 */
export async function getCountryDirections(): Promise<CountryDirection[]> {
  try {
    return await fetchClient<CountryDirection[]>("/directions");
  } catch {
    return COUNTRY_DIRECTIONS;
  }
}

/**
 * 3. Расчет суммы перевода и комиссии по курсу в реальном времени
 */
export async function calculateTransfer(
  countryId: string,
  sendAmountRUB: number
): Promise<TransferCalculation> {
  try {
    return await fetchClient<TransferCalculation>("/transfers/calculate", {
      method: "POST",
      body: JSON.stringify({ countryId, sendAmountRUB }),
    });
  } catch {
    const dir = COUNTRY_DIRECTIONS.find((d) => d.id === countryId) || COUNTRY_DIRECTIONS[0];
    const receiveAmount = Math.round(sendAmountRUB * dir.rate);
    return {
      sendAmount: sendAmountRUB,
      sendCurrency: "RUB",
      receiveAmount,
      receiveCurrency: dir.currencyCode,
      exchangeRate: dir.rate,
      fee: 0,
      countryId: dir.id,
    };
  }
}

/**
 * 4. Создание заявки на перевод
 */
export async function createTransfer(payload: {
  countryId: string;
  bankName: string;
  recipientPhone?: string;
  recipientCard?: string;
  recipientFirstName: string;
  recipientLastName: string;
  senderBank: string;
  sendAmountRUB: number;
}): Promise<{ transferId: string; status: string }> {
  try {
    return await fetchClient<{ transferId: string; status: string }>("/transfers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      transferId: `MM-${Date.now().toString().slice(-6)}`,
      status: "pending",
    };
  }
}

/**
 * 5. Получение профиля текущего пользователя
 */
export async function getUserProfile(): Promise<UserAccount> {
  try {
    return await fetchClient<UserAccount>("/user/profile");
  } catch {
    return CURRENT_USER;
  }
}

/**
 * 6. Получение истории транзакций с фильтрацией
 */
export async function getTransactionsHistory(filters?: {
  currency?: string;
  country?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<TransactionRecord[]> {
  try {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return await fetchClient<TransactionRecord[]>(`/transfers/history?${params}`);
  } catch {
    let list = [...MOCK_TRANSACTIONS];
    if (filters?.country) {
      list = list.filter((t) => t.country.toLowerCase().includes(filters.country!.toLowerCase()));
    }
    return list;
  }
}

/**
 * 7. Получение текстов правовых документов
 */
export async function getLegalDocuments(): Promise<LegalDocument[]> {
  try {
    return await fetchClient<LegalDocument[]>("/documents");
  } catch {
    return LEGAL_DOCUMENTS;
  }
}

/**
 * 8. FAQ и Отзывы
 */
export async function getFAQList(): Promise<FAQItem[]> {
  try {
    return await fetchClient<FAQItem[]>("/faq");
  } catch {
    return FAQ_ITEMS;
  }
}

export async function getReviewsList(): Promise<Review[]> {
  try {
    return await fetchClient<Review[]>("/reviews");
  } catch {
    return REVIEWS;
  }
}

/**
 * 9. Отправка SMS-кода для авторизации или регистрации
 */
export async function sendAuthCode(phone: string): Promise<AuthSendCodeResponse> {
  try {
    return await fetchClient<AuthSendCodeResponse>("/auth/send-code", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
  } catch {
    return {
      success: true,
      message: "Код подтверждения успешно отправлен в SMS",
      retryAfterSeconds: 59,
    };
  }
}

/**
 * 10. Проверка SMS-кода и авторизация
 */
export async function verifyAuthCode(
  phone: string,
  code: string
): Promise<AuthVerifyCodeResponse> {
  try {
    return await fetchClient<AuthVerifyCodeResponse>("/auth/verify-code", {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    });
  } catch {
    return {
      token: "mock-jwt-token-xyz123",
      user: CURRENT_USER,
      isNewUser: false,
    };
  }
}

/**
 * 11. Создание профиля нового пользователя (Регистрация)
 */
export async function registerUser(
  payload: RegisterPayload
): Promise<{ success: boolean; user: UserAccount }> {
  try {
    return await fetchClient<{ success: boolean; user: UserAccount }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      success: true,
      user: {
        ...CURRENT_USER,
        fullName: `${payload.surname} ${payload.name}`,
        phone: payload.phone,
      },
    };
  }
}

/**
 * 12. Обновление профиля пользователя
 */
export async function updateUserProfile(
  payload: Partial<UserAccount>
): Promise<UserAccount> {
  try {
    return await fetchClient<UserAccount>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ...CURRENT_USER,
      ...payload,
    };
  }
}

/**
 * 13. Отправка и подтверждение смены номера телефона
 */
export async function sendPhoneVerificationCode(
  newPhone: string
): Promise<AuthSendCodeResponse> {
  try {
    return await fetchClient<AuthSendCodeResponse>("/user/phone/send-code", {
      method: "POST",
      body: JSON.stringify({ phone: newPhone }),
    });
  } catch {
    return {
      success: true,
      message: "Код подтверждения отправлен на новый номер",
      retryAfterSeconds: 59,
    };
  }
}

export async function verifyPhoneChange(
  newPhone: string,
  code: string
): Promise<UpdateContactResponse> {
  try {
    return await fetchClient<UpdateContactResponse>("/user/phone/verify", {
      method: "POST",
      body: JSON.stringify({ phone: newPhone, code }),
    });
  } catch {
    return {
      success: true,
      message: "Номер телефона успешно изменён и подтверждён",
    };
  }
}

/**
 * 14. Отправка и подтверждение смены E-mail
 */
export async function sendEmailVerificationCode(
  newEmail: string
): Promise<AuthSendCodeResponse> {
  try {
    return await fetchClient<AuthSendCodeResponse>("/user/email/send-code", {
      method: "POST",
      body: JSON.stringify({ email: newEmail }),
    });
  } catch {
    return {
      success: true,
      message: "Код подтверждения отправлен на новый e-mail",
      retryAfterSeconds: 59,
    };
  }
}

export async function verifyEmailChange(
  newEmail: string,
  code: string
): Promise<UpdateContactResponse> {
  try {
    return await fetchClient<UpdateContactResponse>("/user/email/verify", {
      method: "POST",
      body: JSON.stringify({ email: newEmail, code }),
    });
  } catch {
    return {
      success: true,
      message: "Адрес электронной почты успешно обновлён",
    };
  }
}

/**
 * 15. Получение форматов и масок национальных документов
 */
export async function getDocumentFormats(): Promise<DocumentFormatConfig[]> {
  try {
    return await fetchClient<DocumentFormatConfig[]>("/documents/formats");
  } catch {
    return DOCUMENT_FORMATS;
  }
}

/**
 * 16. Получение текстов сообщений, ошибок и отказов
 */
export async function getSystemMessages(): Promise<SystemMessageConfig[]> {
  try {
    return await fetchClient<SystemMessageConfig[]>("/system/messages");
  } catch {
    return SYSTEM_MESSAGES;
  }
}

