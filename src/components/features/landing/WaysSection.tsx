import React from "react";
import Image from "next/image";

/**
 * Секция "Разные способы переводов" — 100% точное соответствие Figma 11:570 (Desktop) и 13:1230 (Mobile)
 */
export const WaysSection: React.FC = () => {
  return (
    <section className="w-full bg-[#F7FAFC] py-8 lg:py-0 lg:h-[200px] flex items-center">
      <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-10 lg:px-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 lg:gap-6">
        {/* WaysText (#11:571 Desktop / #13:1230 Mobile: left-aligned) */}
        <div className="flex flex-col gap-2 lg:gap-3 text-left">
          {/* Title (#11:572 / #13:1231: Inter Bold 26px Desktop / 20px Mobile, #14171C) */}
          <h2 className="text-[20px] lg:text-[26px] font-bold text-[#14171C]">
            Разные способы переводов
          </h2>

          {/* Subtitle Desktop (#11:573) */}
          <p className="hidden lg:block text-[15px] font-medium text-[#4D3352] leading-normal max-w-[560px]">
            По номеру телефона &nbsp;·&nbsp; На карту &nbsp;·&nbsp; По банковским реквизитам
          </p>

          {/* Subtitle Mobile (#13:1232) */}
          <p className="lg:hidden text-[14px] font-medium text-[#4D3352] leading-relaxed">
            По номеру телефона · На карту · По банковским реквизитам · Наличными в пункте выдачи
          </p>
        </div>

        {/* WaysIcon (#11:574: только на Desktop, на mobile в Figma иконки нет) */}
        <div className="hidden lg:block relative w-[120px] h-[120px] rounded-[16px] overflow-hidden flex-shrink-0">
          <Image
            src="/images/ways_icon.png"
            alt="Способы переводов"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};
