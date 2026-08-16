"use client";

import React from "react";
import { Check } from "lucide-react";

interface ProfileTabProps {
  onNavigateToTab?: (tab: string) => void;
}

/**
 * Вкладка "Профиль" — 100% Pixel-Perfect по нодам Figma:
 * - Desktop (#5:2: 1440px)
 * - Mobile (#20:1300: 375-390px)
 */
export const ProfileTab: React.FC<ProfileTabProps> = ({ onNavigateToTab }) => {
  return (
    <div className="flex flex-col gap-5 lg:gap-8 w-full max-w-[1064px]">
      {/* Заголовок (#8:36 / #20:1302: Inter Bold 24px/28px #14171C) */}
      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        Профиль
      </h1>

      {/* Mobile UserCard (#20:1303: visible only on mobile) */}
      <div className="lg:hidden flex items-center gap-3 bg-transparent pb-1">
        {/* Avatar (#20:1304: 48x48px, bg #D9DEE5) */}
        <div className="w-12 h-12 rounded-full bg-[#D9DEE5] text-[#14171C] font-semibold text-[16px] flex items-center justify-center flex-shrink-0 select-none">
          И
        </div>
        <div className="flex flex-col">
          {/* #20:1306: Inter SemiBold 16px, #14171C */}
          <span className="text-[16px] font-semibold text-[#14171C]">
            Иван Иванов
          </span>
          {/* #20:1307: Inter Regular 13px, #8C9199 */}
          <span className="text-[13px] font-normal text-[#8C9199]">
            +7 900 xxx-xx-89
          </span>
        </div>
      </div>

      {/* Row1: CardData & CardVerify */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
        {/* CardData (#8:39 / #20:1308) */}
        <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-5 lg:p-6 flex flex-col justify-between gap-4">
          <h3 className="text-[16px] font-bold text-[#14171C]">
            Личные данные
          </h3>

          <div className="flex flex-col gap-3">
            {/* FieldPhone */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] font-normal text-[#8C9199]">
                Телефон
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal text-[#40454D]">
                  +7 900 xxx-xx-89 · подтверждён
                </span>
                <div className="w-4 h-4 rounded-full bg-[#0D8C47] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>
            </div>

            {/* FieldEmail */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] font-normal text-[#8C9199]">
                E-mail
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal text-[#40454D]">
                  druxxxxx1981@gmail.com · подтверждён
                </span>
                <div className="w-4 h-4 rounded-full bg-[#0D8C47] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert("Для изменения данных обратитесь в поддержку.")}
            className="text-[13px] font-semibold text-[#0D8C47] hover:underline text-left self-start"
          >
            Изменить данные
          </button>
        </div>

        {/* CardVerify (#8:40 / #20:1313) */}
        <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-5 lg:p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-[16px] font-bold text-[#14171C]">
              Статус верификации
            </h3>

            {/* StatusBadge (#8:46 / #20:1315) */}
            <div className="w-fit px-2.5 py-0.5 rounded-[6px] bg-[#FCE5E5] text-[#BF2626] text-[12px] font-semibold">
              Не пройдена
            </div>

            <p className="hidden lg:block text-[13px] font-normal text-[#666B73] leading-relaxed">
              Верификация не пройдена, доступны переводы с ограничением по сумме.
            </p>
          </div>

          {/* VerifyButton (#8:48 / #20:1317: full-width on mobile, 200px on desktop) */}
          <button
            type="button"
            onClick={() => onNavigateToTab && onNavigateToTab("verification")}
            className="w-full lg:w-[200px] h-[44px] lg:h-[40px] rounded-[10px] lg:rounded-[8px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold flex items-center justify-center transition-colors active:scale-[0.98]"
          >
            Пройти верификацию
          </button>
        </div>
      </div>

      {/* Desktop QuickLinksRow (#8:38) */}
      <div className="hidden lg:grid grid-cols-4 gap-6 w-full">
        {[
          { id: "limits", title: "Лимиты", sub: "До 60 000 ₽ упрощённая идентификация" },
          { id: "security", title: "Безопасность", sub: "Двухфакторная аутентификация, сессии" },
          { id: "settings", title: "Настройки", sub: "Валюта, язык, уведомления" },
          { id: "documents", title: "Документы", sub: "Важные документы" },
        ].map((card) => (
          <div
            key={card.id}
            onClick={() => onNavigateToTab && onNavigateToTab(card.id)}
            className="bg-white rounded-[12px] p-5 hover:border-[#CCD1D9] transition-all cursor-pointer flex flex-col gap-1.5 h-[110px] justify-center"
          >
            <span className="text-[15px] font-bold text-[#14171C]">
              {card.title}
            </span>
            <span className="text-[12px] font-normal text-[#8C9199] leading-snug">
              {card.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile QuickLinks List (#22:1319 - #22:1322: 4 separate full-width rows with ›) */}
      <div className="lg:hidden flex flex-col gap-2.5 w-full">
        {[
          { id: "limits", title: "Лимиты" },
          { id: "security", title: "Безопасность" },
          { id: "settings", title: "Настройки" },
          { id: "documents", title: "Документы" },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateToTab && onNavigateToTab(item.id)}
            className="w-full h-[56px] bg-white rounded-[12px] px-5 flex items-center justify-between cursor-pointer active:bg-[#F2F5F7] transition-colors"
          >
            <span className="text-[15px] font-semibold text-[#14171C]">
              {item.title}
            </span>
            <span className="text-[#8C9199] text-xl font-light">
              ›
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
