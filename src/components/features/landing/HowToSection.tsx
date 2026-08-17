import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

/**
 * Секция "Как отправить перевод?" — 100% точное соответствие Figma 11:596 (Desktop) и 20:1254 (Mobile)
 */
export const HowToSection: React.FC = () => {
  return (
    <section id="how-it-works" className="w-full bg-white py-10 lg:py-[70px]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 flex flex-col items-start lg:items-center gap-6 lg:gap-10">
        {/* Заголовок (#11:597 / #20:1255: Desktop по центру 32px, Mobile по левому краю 22px) */}
        <h2 className="text-[22px] lg:text-[32px] font-bold text-[#14171C] text-left lg:text-center tracking-tight w-full">
          Как отправить перевод?
        </h2>

        {/* ================= DESKTOP ВЕРСИЯ (#11:598) ================= */}
        <div className="hidden lg:flex w-full max-w-[1280px] items-center justify-between gap-[60px]">
          {/* Левая колонка: HowToSteps (#11:599: 3 шага с зелеными кнопками) */}
          <div className="flex flex-col gap-[28px] w-full max-w-[640px]">
            <div className="flex items-start gap-4">
              <div className="w-[42px] h-[42px] rounded-[10px] bg-[#0D8C47] text-white text-[18px] font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-bold text-[#14171C]">
                  Зарегистрируйтесь
                </h3>
                <p className="text-[14px] text-[#666B73] leading-normal">
                  Укажите номер телефона и подтвердите его кодом из SMS
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-[42px] h-[42px] rounded-[10px] bg-[#0D8C47] text-white text-[18px] font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-bold text-[#14171C]">
                  Оформите перевод
                </h3>
                <p className="text-[14px] text-[#666B73] leading-normal">
                  Выберите страну, сумму и способ получения денег
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-[42px] h-[42px] rounded-[10px] bg-[#0D8C47] text-white text-[18px] font-bold flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-bold text-[#14171C]">
                  Получите деньги
                </h3>
                <p className="text-[14px] text-[#666B73] leading-normal">
                  Получатель увидит деньги уже в течение нескольких минут
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка: HowToGraphic (#11:600: 580x280px) */}
          <div className="relative w-[580px] h-[280px] rounded-[24px] overflow-hidden shadow-sm bg-[#F2F5F7] flex-shrink-0">
            <Image
              src={getAssetPath("/images/how_to_graphic.png")}
              alt="Как отправить перевод"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ================= MOBILE ВЕРСИЯ (#20:1254: Графика сверху, под ней текстовый список) ================= */}
        <div className="lg:hidden w-full max-w-[335px] mx-auto flex flex-col gap-5">
          {/* Графика (#20:1256: 335x180px, borderRadius 18px) */}
          <div className="relative w-full h-[180px] rounded-[18px] overflow-hidden bg-[#F2F5F7]">
            <Image
              src={getAssetPath("/images/how_to_graphic.png")}
              alt="Как отправить перевод"
              fill
              className="object-cover"
            />
          </div>

          {/* Текстовый список шагов (#20:1257: gap 16px, Inter Medium 14px #333840) */}
          <div className="flex flex-col gap-4 pt-1">
            <p className="text-[14px] font-medium text-[#333840] leading-relaxed">
              1.&nbsp;&nbsp;Зарегистрируйтесь — укажите номер телефона и подтвердите код
            </p>
            <p className="text-[14px] font-medium text-[#333840] leading-relaxed">
              2.&nbsp;&nbsp;Оформите перевод — выберите страну, сумму и способ получения
            </p>
            <p className="text-[14px] font-medium text-[#333840] leading-relaxed">
              3.&nbsp;&nbsp;Получите деньги — за несколько минут
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
