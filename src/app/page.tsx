"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/landing/HeroSection";
import { AdvantagesSection } from "@/components/features/landing/AdvantagesSection";
import { WaysSection } from "@/components/features/landing/WaysSection";
import { DirectionsGrid } from "@/components/features/landing/DirectionsGrid";
import { HowToSection } from "@/components/features/landing/HowToSection";
import { FAQSection } from "@/components/features/landing/FAQSection";
import { ReviewsSection } from "@/components/features/landing/ReviewsSection";
import { InteractiveCalculator } from "@/components/features/calculator/InteractiveCalculator";

/**
 * Главная страница сервиса MiraMoney
 * Pixel-Perfect реализация по макету Figma Desktop 1440px (#8:532) и Mobile 375px (#13:1203)
 */
export default function Home() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("Узбекистан");

  const handleStartTransfer = (countryName?: string) => {
    if (countryName) {
      setSelectedCountry(countryName);
    }
    setIsCalculatorOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-[#14171C]">
      {/* Шапка сайта (#8:533 Desktop / #13:1204 Mobile) */}
      <Header onStartTransfer={() => handleStartTransfer()} />

      {/* Основной контент лендинга */}
      <main className="flex-1 flex flex-col">
        {/* Hero-блок (#8:544 Desktop / #13:1210 Mobile) */}
        <HeroSection onStartTransfer={() => handleStartTransfer()} />

        {/* Преимущества MiraMoney (#8:554 Desktop / #13:1216 Mobile) */}
        <AdvantagesSection />

        {/* Разные способы переводов (#11:570 Desktop / #13:1230 Mobile) */}
        <WaysSection />

        {/* Доступные направления (#11:575 Desktop / #13:1233 Mobile) */}
        <DirectionsGrid onSelectCountry={(country) => handleStartTransfer(country)} />

        {/* Как отправить перевод? (#11:596 Desktop / #20:1254 Mobile) */}
        <HowToSection />

        {/* Часто задаваемые вопросы (#11:613 Desktop / #20:1261 Mobile) */}
        <FAQSection />

        {/* Отзывы наших клиентов (#11:631 Desktop / #20:1279 Mobile) */}
        <ReviewsSection />
      </main>

      {/* Подвал (#11:643 Desktop / #20:1290 Mobile) */}
      <Footer />

      {/* Модальное окно оформления и расчета перевода (#11:783) */}
      <InteractiveCalculator
        isModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialCountryName={selectedCountry}
      />
    </div>
  );
}
