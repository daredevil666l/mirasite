"use client";

import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  onStartTransfer?: () => void;
}

/**
 * Главный Hero-блок — Pixel-Perfect соответствие ноде Figma 8:544 (Desktop 1440) и 13:1210 (Mobile 375)
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onStartTransfer }) => {
  const scrollToHowTo = () => {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#0A4024] text-white">
      <div className="max-w-[1440px] mx-auto min-h-[520px] px-5 sm:px-10 lg:px-20 py-8 lg:py-[70px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-[60px]">
        {/* Мобильный порядок: сначала фото (#13:1211), потом текст */}
        <div className="lg:hidden w-full flex justify-center">
          <div className="relative w-full max-w-[335px] h-[220px] rounded-[16px] overflow-hidden">
            <Image
              src="/images/hero.png"
              alt="Денежные переводы"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Левая колонка: HeroText (#8:545, max-w 560px, gap 24px) */}
        <div className="flex flex-col gap-5 lg:gap-6 max-w-[560px] w-full">
          {/* Заголовок (#8:547: Inter Bold 44px, Desktop / 28px Mobile, #FFFFFF) */}
          <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.18] tracking-tight text-white">
            Отправляйте денежные переводы домой
          </h1>

          {/* Подзаголовок (#8:548: Inter Regular 16px Desktop / 15px Mobile, #D9E5EB) */}
          <p className="text-[15px] lg:text-[16px] text-[#D9E5EB] leading-[1.45] font-normal max-w-[480px]">
            Быстрые и надёжные переводы за рубеж — по номеру телефона или карты, с выгодным курсом и без скрытых комиссий.
          </p>

          {/* Кнопки (#8:549: row, gap 14px) */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1 lg:pt-2">
            {/* PrimaryCTA (#8:550: w 180px, h 50px, bg #0D8C47, borderRadius 10px) */}
            <button
              onClick={onStartTransfer}
              className="w-full sm:w-[180px] h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98]"
            >
              Отправить перевод
            </button>

            {/* SecondaryCTA (#8:551: w 200px, h 50px, border 1.5px rgba(255,255,255,0.4), borderRadius 10px) */}
            <button
              onClick={scrollToHowTo}
              className="w-full sm:w-[200px] h-[50px] bg-transparent hover:bg-white/10 text-white text-[15px] font-semibold border-[1.5px] border-white/40 rounded-[10px] flex items-center justify-center transition-colors active:scale-[0.98]"
            >
              Как это работает
            </button>
          </div>
        </div>

        {/* Правая колонка Desktop: HeroImage (#8:546: 520x380px, borderRadius 20px) */}
        <div className="hidden lg:flex justify-end flex-shrink-0">
          <div className="relative w-[520px] h-[380px] rounded-[20px] overflow-hidden shadow-lg">
            <Image
              src="/images/hero.png"
              alt="Денежные переводы за рубеж"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
