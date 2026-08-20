"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface LimitsTabProps {
  onBack?: () => void;
}

/**
 * Вкладка "Лимиты" — 100% Pixel-Perfect по ноде Figma #8:226 (Desktop 1440) и #22:1430 (Mobile)
 */
export const LimitsTab: React.FC<LimitsTabProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
      {/* Кнопка возврата в ЛК для мобильной версии */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="lg:hidden flex items-center gap-1.5 text-[14px] font-semibold text-[#0D8C47] hover:underline self-start cursor-pointer -mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад в профиль</span>
        </button>
      )}

      {/* Заголовок (#8:260: Inter Bold 28px #14171C) */}
      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        Лимиты
      </h1>

      {/* LimitsCard (#8:287: 1064px, bg #FFFFFF, borderRadius 12px, padding 32px) */}
      <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border border-[#E5E8ED]">
        {/* CardResidents (#8:288) */}
        <div className="flex flex-col gap-4">
          {/* #8:290: Inter Bold 16px, #14171C */}
          <h3 className="text-[16px] font-bold text-[#14171C]">
            Лимиты для резидентов
          </h3>

          <div className="flex flex-col gap-3">
            {/* #8:291 */}
            <p className="text-[14px] text-[#40454D] font-normal">
              До 15 000 ₽ — без идентификации
            </p>
            {/* #8:292 */}
            <p className="text-[14px] text-[#40454D] font-normal">
              До 60 000 ₽ — при упрощённой идентификации
            </p>
            {/* #8:293 */}
            <p className="text-[14px] text-[#40454D] font-normal">
              Более 60 000 ₽ — при полной идентификации
            </p>
          </div>
        </div>

        {/* CardNonResidents (#8:289) */}
        <div className="flex flex-col gap-4">
          {/* #8:294: Inter Bold 16px, #14171C */}
          <h3 className="text-[16px] font-bold text-[#14171C]">
            Лимиты для нерезидентов
          </h3>

          <div className="flex flex-col gap-3">
            {/* #8:295 */}
            <p className="text-[14px] text-[#40454D] font-normal">
              До 15 000 ₽ — без идентификации
            </p>
            {/* #8:296 */}
            <p className="text-[14px] text-[#40454D] font-normal">
              До 60 000 ₽ — при упрощённой идентификации
            </p>
            {/* #8:297 */}
            <p className="text-[14px] text-[#40454D] font-normal">
              Более 60 000 ₽ — при полной идентификации
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
