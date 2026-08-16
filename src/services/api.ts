import {
  Currency,
  CountryDirection,
  TransferCalculation,
  UserAccount,
  TransactionRecord,
  LegalDocument,
  FAQItem,
  Review,
} from "@/types";
import {
  SUPPORTED_CURRENCIES,
  COUNTRY_DIRECTIONS,
  CURRENT_USER,
  MOCK_TRANSACTIONS,
  LEGAL_DOCUMENTS,
  FAQ_ITEMS,
  REVIEWS,
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
