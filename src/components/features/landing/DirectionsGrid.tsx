"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface DirectionsGridProps {
  onSelectCountry?: (countryName: string) => void;
}

/**
 * Секция "Доступные направления" — 100% точное соответствие Figma 11:575 (Desktop) и 13:1233 (Mobile)
 */
export const DirectionsGrid: React.FC<DirectionsGridProps> = ({ onSelectCountry }) => {
  // Порядок для десктопа (#11:577)
  const desktopDirections = [
    { id: "uz", name: "Узбекистан", flag: getAssetPath("/images/flag_uz.png") },
    { id: "cn", name: "Китай", flag: getAssetPath("/images/flag_cn.png") },
    { id: "by", name: "Беларусь", flag: getAssetPath("/images/flag_by.png") },
    { id: "ru", name: "Россия", flag: getAssetPath("/images/flag_ru.png") },
    { id: "kg", name: "Кыргызстан", flag: getAssetPath("/images/flag_kg.png") },
    { id: "tj", name: "Таджикистан", flag: getAssetPath("/images/flag_tj.png") },
  ];

  // Точный порядок для мобильного (#13:1235: C2 Китай, C1 Узбекистан, C3 Россия, C4 Беларусь, C5 Кыргызстан, C6 Таджикистан)
  const mobileDirections = [
    { id: "cn", name: "Китай", flag: getAssetPath("/images/flag_cn.png") },
    { id: "uz", name: "Узбекистан", flag: getAssetPath("/images/flag_uz.png") },
    { id: "ru", name: "Россия", flag: getAssetPath("/images/flag_ru.png") },
    { id: "by", name: "Беларусь", flag: getAssetPath("/images/flag_by.png") },
    { id: "kg", name: "Кыргызстан", flag: getAssetPath("/images/flag_kg.png") },
    { id: "tj", name: "Таджикистан", flag: getAssetPath("/images/flag_tj.png") },
  ];

  return (
    <section id="directions" className="w-full bg-[#F7FAFC] py-10 lg:py-[70px]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 flex flex-col items-start lg:items-center gap-6 lg:gap-10">
        {/* Заголовок (#11:576 / #13:1234: Desktop по центру 32px, Mobile по левому краю 24px) */}
        <h2 className="text-[24px] lg:text-[32px] font-bold text-[#14171C] text-left lg:text-center tracking-tight w-full">
          Доступные направления
        </h2>

        {/* ================= DESKTOP ГОРИЗОНТАЛЬНЫЙ РЯД (#11:577: 6 карточек в ряд) ================= */}
        <div className="hidden lg:flex w-full max-w-[1100px] justify-center items-center gap-5">
          {desktopDirections.map((dir) => (
            <button
              key={dir.id}
              onClick={() => onSelectCountry && onSelectCountry(dir.name)}
              className="w-[166px] h-[160px] bg-white rounded-[16px] p-[10px] flex flex-col items-center justify-center gap-2.5 shadow-[0px_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer border border-transparent hover:border-[#0D8C47]/30"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-inner">
                <Image
                  src={dir.flag}
                  alt={dir.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[14px] font-semibold text-[#14171C] text-center">
                {dir.name}
              </span>
            </button>
          ))}
        </div>

        {/* ================= MOBILE СЕТКА 2 КОЛОНКИ (#13:1235: 3 строки по 2 карточки) ================= */}
        <div className="lg:hidden w-full max-w-[335px] mx-auto grid grid-cols-2 gap-3.5">
          {mobileDirections.map((dir) => (
            <button
              key={dir.id}
              onClick={() => onSelectCountry && onSelectCountry(dir.name)}
              className="w-full h-[105px] bg-white rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 shadow-[0px_2px_6px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-transform"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 shadow-inner">
                <Image
                  src={dir.flag}
                  alt={dir.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[13px] font-semibold text-[#14171C] text-center">
                {dir.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
