"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/types";

export interface AccordionProps {
  items: FAQItem[];
  className?: string;
}

/**
 * Интерактивный аккордеон для секции "Часто задаваемые вопросы"
 */
export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("w-full bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-mira-gray-300", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="transition-colors">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-mira-gray-100/60 transition-colors focus:outline-none focus:bg-mira-gray-100/80"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] md:text-base font-medium text-mira-dark-600 pr-4">
                {item.question}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  isOpen ? "bg-mira-green-light text-mira-green rotate-180" : "bg-mira-gray-200 text-mira-gray-700"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 md:px-6 pb-6 pt-1 text-sm md:text-[15px] leading-relaxed text-mira-dark-400 animate-in fade-in duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
