"use client";

import React from "react";

interface SecurityTabProps {
  onNavigateToTab?: (tab: string) => void;
}

/**
 * Вкладка "Безопасность" — 100% Pixel-Perfect по нодам Figma:
 * - Desktop (#8:389)
 * - Mobile (#22:1511)
 */
export const SecurityTab: React.FC<SecurityTabProps> = ({ onNavigateToTab }) => {
  return (
    <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
      {/* Заголовок (#8:423 / #22:1513: Inter Bold 24px/28px #14171C) */}
      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        Безопасность
      </h1>

      {/* SecurityCard (#8:450 Desktop / #22:1548 Mobile) */}
      <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-5 lg:p-6 flex flex-col gap-3.5 lg:gap-4">
        {/* Title & Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
          {/* #8:455 / #22:1549: Inter Bold 16px #14171C */}
          <h3 className="text-[16px] font-bold text-[#14171C]">
            Раздел безопасности
          </h3>
          {/* SoonBadge (#8:456 / #22:1550: 12px SemiBold #8C9199, bg #F2F5F7) */}
          <div className="w-fit px-2.5 py-1 bg-[#F2F5F7] rounded-[6px] text-[#8C9199] text-[12px] font-semibold">
            Скоро в приложении
          </div>
        </div>

        {/* Descriptions */}
        <div className="flex flex-col gap-2.5 pt-1">
          {/* Line 1 */}
          <p className="text-[14px] text-[#40454D] font-normal">
            <span className="lg:hidden">Двухфакторная аутентификация</span>
            <span className="hidden lg:inline">Двухфакторная аутентификация — вход по коду из SMS/приложения</span>
          </p>
          {/* Line 2 */}
          <p className="text-[14px] text-[#40454D] font-normal">
            <span className="lg:hidden">Активные сессии</span>
            <span className="hidden lg:inline">Активные сессии — устройства, с которых выполнен вход</span>
          </p>
        </div>

        {/* Link: Пользовательское соглашение */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigateToTab && onNavigateToTab("documents")}
            className="text-[14px] font-semibold text-[#0D8C47] hover:underline text-left"
          >
            Пользовательское соглашение
          </button>
        </div>
      </div>
    </div>
  );
};
