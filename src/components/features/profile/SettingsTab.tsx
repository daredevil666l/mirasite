"use client";

import React, { useState } from "react";
import { CurrencySelectorModal } from "../calculator/CurrencySelectorModal";
import { Currency } from "@/types";

/**
 * Вкладка "Настройки" — 100% Pixel-Perfect по нодам Figma:
 * - Desktop (#8:298)
 * - Mobile (#22:1464)
 */
export const SettingsTab: React.FC = () => {
  const [currencyName, setCurrencyName] = useState("Российский рубль (RUB)");
  const [currencyCode, setCurrencyCode] = useState("RUB");
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);

  const [lang, setLang] = useState<"ru" | "en">("ru");
  const [notif1, setNotif1] = useState(true);
  const [notif2, setNotif2] = useState(true);
  const [notif3, setNotif3] = useState(true);

  const handleSelectCurrency = (curr: Currency) => {
    setCurrencyName(`${curr.name} (${curr.code})`);
    setCurrencyCode(curr.code);
    setIsCurrencyModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
      {/* Заголовок (#8:332 / #22:1464: Inter Bold 24px/28px #14171C) */}
      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        Настройки
      </h1>

      {/* SettingsTopRow (#8:359 / #22:1464) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
        {/* CardCurrency (#8:362 / #22:1468) */}
        <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-5 lg:p-6 flex flex-col gap-3.5">
          <h3 className="text-[16px] font-bold text-[#14171C]">
            Основная валюта
          </h3>

          <button
            type="button"
            onClick={() => setIsCurrencyModalOpen(true)}
            className="w-full h-[44px] px-3.5 rounded-[8px] bg-[#F2F5F7] hover:bg-[#E5E8ED] flex items-center justify-between text-[13px] font-normal text-[#14171C] transition-colors"
          >
            <span>{currencyName}</span>
            <span className="text-[#8C9199] text-xs">▾</span>
          </button>
        </div>

        {/* CardLanguage (#8:363: visible on desktop) */}
        <div className="hidden lg:flex w-full bg-white rounded-[12px] p-6 flex-col gap-3.5">
          <h3 className="text-[16px] font-bold text-[#14171C]">
            Язык интерфейса
          </h3>

          <div className="w-full h-[44px] bg-[#F2F5F7] rounded-[8px] p-1 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setLang("ru")}
              className={`h-full rounded-[6px] text-[13px] transition-all ${
                lang === "ru"
                  ? "bg-white text-[#14171C] font-semibold shadow-xs"
                  : "text-[#8C9199] font-normal"
              }`}
            >
              Русский
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`h-full rounded-[6px] text-[13px] transition-all ${
                lang === "en"
                  ? "bg-white text-[#14171C] font-semibold shadow-xs"
                  : "text-[#8C9199] font-normal"
              }`}
            >
              Английский
            </button>
          </div>
        </div>
      </div>

      {/* NotifCard (#8:360 / #22:1473) */}
      <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-5 lg:p-6 flex flex-col gap-4">
        <h3 className="text-[16px] font-bold text-[#14171C]">
          Уведомления
        </h3>

        <div className="flex flex-col divide-y divide-[#F2F5F7]">
          {/* Row 1 */}
          <div className="py-3 flex items-center justify-between">
            <span className="text-[14px] font-normal text-[#14171C]">
              <span className="lg:hidden">Безопасность</span>
              <span className="hidden lg:inline">Безопасность — входы в аккаунт, подозрительная активность</span>
            </span>
            <button
              type="button"
              onClick={() => setNotif1(!notif1)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notif1 ? "bg-[#0D8C47]" : "bg-[#D9DEE5]"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notif1 ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Row 2 */}
          <div className="py-3 flex items-center justify-between">
            <span className="text-[14px] font-normal text-[#14171C]">
              <span className="lg:hidden">Условия и тарифы</span>
              <span className="hidden lg:inline">Условия и тарифы — изменения условий обслуживания</span>
            </span>
            <button
              type="button"
              onClick={() => setNotif2(!notif2)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notif2 ? "bg-[#0D8C47]" : "bg-[#D9DEE5]"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notif2 ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Row 3 */}
          <div className="py-3 flex items-center justify-between">
            <span className="text-[14px] font-normal text-[#14171C]">
              <span className="lg:hidden">Операции</span>
              <span className="hidden lg:inline">Операции — переводы, статус, отмены, возвраты</span>
            </span>
            <button
              type="button"
              onClick={() => setNotif3(!notif3)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notif3 ? "bg-[#0D8C47]" : "bg-[#D9DEE5]"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notif3 ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SupportCard (#8:361 / #22:1485) */}
      <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-5 lg:p-6 flex flex-col gap-3">
        <h3 className="text-[16px] font-bold text-[#14171C]">
          Поддержка
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8 text-[14px]">
          <button
            type="button"
            onClick={() => alert("Открытие чата поддержки...")}
            className="text-[#0D8C47] font-semibold hover:underline text-left"
          >
            Написать в чат поддержки
          </button>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            className="text-[#0D8C47] font-semibold hover:underline"
          >
            Написать в Telegram
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="text-[#0D8C47] font-semibold hover:underline"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>

      {/* Custom Currency Selector Popup (#107:208 / #107:812) */}
      <CurrencySelectorModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        selectedCurrencyCode={currencyCode}
        onSelectCurrency={handleSelectCurrency}
      />
    </div>
  );
};
