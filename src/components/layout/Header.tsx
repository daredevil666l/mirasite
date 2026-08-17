"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { getAssetPath } from "@/lib/utils";

interface HeaderProps {
  onStartTransfer?: () => void;
}

/**
 * Хедер сайта — Pixel-Perfect соответствие ноде Figma 8:533 (Desktop 1440) и 13:1204 (Mobile 375)
 */
export const Header: React.FC<HeaderProps> = ({ onStartTransfer }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#EDF0F2]">
        <div className="max-w-[1440px] mx-auto h-[60px] md:h-[84px] px-5 lg:px-20 flex items-center justify-between">
          {/* Левая часть: Логотип MiraMoney (#41:4349 / #59:13, 94x36px) */}
          <div className="flex items-center gap-12">
            <Link href="/" className="relative w-[94px] h-[36px] flex-shrink-0 flex items-center">
              <Image
                src={getAssetPath("/images/logo.png")}
                alt="MiraMoney"
                fill
                priority
                className="object-contain object-left"
              />
            </Link>

            {/* Навигационные ссылки (#8:535: gap 32px, Inter 14px Medium #40454D) */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="#how-it-works"
                className="text-[14px] font-medium text-[#40454D] hover:text-[#0D8C47] transition-colors"
              >
                Как это работает
              </Link>
              <Link
                href="#directions"
                className="text-[14px] font-medium text-[#40454D] hover:text-[#0D8C47] transition-colors"
              >
                Направления
              </Link>
              <Link
                href="#advantages"
                className="text-[14px] font-medium text-[#40454D] hover:text-[#0D8C47] transition-colors"
              >
                Тарифы
              </Link>
              <Link
                href="#faq"
                className="text-[14px] font-medium text-[#40454D] hover:text-[#0D8C47] transition-colors"
              >
                Вопросы
              </Link>
            </nav>
          </div>

          {/* Правая часть: Действия (#8:536) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/register"
              className="text-[14px] font-semibold text-[#40454D] hover:text-[#0D8C47] transition-colors"
            >
              Войти
            </Link>

            {/* Кнопка "Начать перевод" (#8:542: w 180px, h 44px, bg #0D8C47, borderRadius 8px) */}
            <button
              onClick={onStartTransfer}
              className="w-[180px] h-[44px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold rounded-[8px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98]"
            >
              Начать перевод
            </button>
          </div>

          {/* Мобильная кнопка меню-бургера (#13:1206: 24x18px) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden flex flex-col justify-between w-6 h-[18px] focus:outline-none"
            aria-label="Открыть меню"
          >
            <span className="w-full h-[2px] bg-[#14171C] rounded-full" />
            <span className="w-full h-[2px] bg-[#14171C] rounded-full" />
            <span className="w-full h-[2px] bg-[#14171C] rounded-full" />
          </button>
        </div>
      </header>

      {/* Мобильный Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onStartTransfer={onStartTransfer}
      />
    </>
  );
};
