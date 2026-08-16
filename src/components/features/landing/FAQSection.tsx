"use client";

import React, { useState } from "react";

/**
 * Секция "Часто задаваемые вопросы" — 100% точное соответствие Figma 11:613 (Desktop) и 20:1261 (Mobile)
 */
export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqItems = [
    {
      id: "faq-1",
      desktopQuestion: "Как долго идёт перевод?",
      mobileQuestion: "Как долго идёт перевод?",
      answer: "В большинстве направлений переводы зачисляются мгновенно или в течение нескольких минут.",
    },
    {
      id: "faq-2",
      desktopQuestion: "Какая комиссия за перевод?",
      mobileQuestion: "Какая комиссия за перевод?",
      answer: "Комиссия за перевод составляет 0 ₽. Мы фиксируем прозрачный курс без скрытых списаний.",
    },
    {
      id: "faq-3",
      desktopQuestion: "Нужна ли верификация для перевода?",
      mobileQuestion: "Нужна ли верификация?",
      answer: "Для переводов в рамках начального лимита достаточно номера телефона. Для увеличения лимитов требуется подтверждение личности.",
    },
    {
      id: "faq-4",
      desktopQuestion: "Что делать, если перевод не пришёл?",
      mobileQuestion: "Перевод не пришёл — что делать?",
      answer: "Проверьте статус операции в личном кабинете или обратитесь в круглосуточную службу поддержки.",
    },
    {
      id: "faq-5",
      desktopQuestion: "Какие способы получения доступны?",
      mobileQuestion: "Способы получения?",
      answer: "Доступны переводы по номеру телефона, на банковские карты (Uzcard, Humo, Корти Милли, Элкарт, БЕЛКАРТ) и по реквизитам счета.",
    },
  ];

  return (
    <section id="faq" className="w-full bg-[#F7FAFC] py-10 lg:py-[70px]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 flex flex-col items-start lg:items-center gap-6 lg:gap-[32px]">
        {/* Заголовок (#11:614 / #20:1262: Desktop центрирован 32px, Mobile по левому краю 22px) */}
        <h2 className="text-[22px] lg:text-[32px] font-bold text-[#14171C] text-left lg:text-center tracking-tight w-full">
          Часто задаваемые вопросы
        </h2>

        {/* FAQList (#11:615 Desktop max-w 900px, #20:1263 Mobile max-w 335px) */}
        <div className="w-full max-w-[335px] lg:max-w-[900px] mx-auto bg-white rounded-[14px] lg:rounded-[16px] p-2.5 flex flex-col gap-[2px] shadow-[0px_2px_8px_rgba(0,0,0,0.02)]">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="w-full bg-white rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full min-h-[52px] lg:min-h-[56px] px-3.5 lg:px-6 py-2.5 flex items-center justify-between text-left hover:bg-[#F7FAFC] rounded-lg transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  {/* Вопрос: Desktop vs Mobile */}
                  <span className="text-[14px] lg:text-[15px] font-medium text-[#262930] pr-3">
                    <span className="hidden lg:inline">{item.desktopQuestion}</span>
                    <span className="lg:hidden inline">{item.mobileQuestion}</span>
                  </span>

                  {/* Иконка + */}
                  <span className="text-[18px] font-normal text-[#999EA6] flex-shrink-0 select-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-3.5 lg:px-6 pb-4 pt-1 text-[13px] lg:text-[14px] text-[#666B73] leading-relaxed animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
