import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединение классов Tailwind CSS с разрешением конфликтов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирование чисел в денежный формат с пробелами между разрядами (например, 15 400 или 2 366 364)
 */
export function formatMoney(amount: number, decimals: number = 0): string {
  if (isNaN(amount)) return "0";
  
  const fixed = amount.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
  if (decimals > 0 && decPart) {
    return `${formattedInt},${decPart}`;
  }
  
  return formattedInt;
}

/**
 * Парсинг строки с пробелами или запятыми в число
 */
export function parseMoney(value: string): number {
  const clean = value.replace(/\s+/g, "").replace(",", ".");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

/**
 * Получение корректного пути к статическому ассету с учетом basePath (для GitHub Pages)
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/mirasite" : "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

