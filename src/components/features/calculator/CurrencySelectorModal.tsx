"use client";

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { SUPPORTED_CURRENCIES } from "@/data/mockData";
import { Currency } from "@/types";

interface CurrencySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrencyCode: string;
  onSelectCurrency: (currency: Currency) => void;
}

/**
 * Попап выбора валюты:
 * - Desktop (#107:208): 440px центрированное модальное окно
 * - Mobile (#107:812): Bottom Sheet (шторка снизу с grab-handle)
 */
export const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCurrencyCode,
  onSelectCurrency,
}) => {
  const [tempSelectedCode, setTempSelectedCode] = useState<string>(selectedCurrencyCode);

  useEffect(() => {
    if (isOpen) {
      setTempSelectedCode(selectedCurrencyCode);
    }
  }, [isOpen, selectedCurrencyCode]);

  if (!isOpen) return null;

  const handleApply = () => {
    const found = SUPPORTED_CURRENCIES.find((c) => c.code === tempSelectedCode);
    if (found) {
      onSelectCurrency(found);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop (#107:209: dark overlay) */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Container:
          Mobile (#107:812): Bottom sheet rounded-t-[20px] w-full
          Desktop (#107:210): 440px modal rounded-[16px]
      */}
      <div className="relative w-full sm:w-[440px] max-h-[85vh] bg-white rounded-t-[20px] sm:rounded-[16px] p-6 sm:p-7 shadow-2xl z-10 flex flex-col gap-5 overflow-hidden animate-in fade-in zoom-in-95 sm:zoom-in-100 slide-in-from-bottom-5 duration-200">
        {/* Mobile Grab Handle (#107:814) */}
        <div className="sm:hidden w-10 h-1 bg-[#D9DEE5] rounded-full mx-auto -mt-2 mb-1" />

        {/* TitleRow (#107:213 / #107:815) */}
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-[#14171C]">
            Выберите валюту
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#F2F5F7] hover:bg-[#E5E8ED] flex items-center justify-center text-[#8C9199] hover:text-[#14171C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Currency List (#107:214: gap 10px) */}
        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[360px] pr-1 py-1">
          {SUPPORTED_CURRENCIES.map((curr) => {
            const isSelected = tempSelectedCode === curr.code;

            return (
              <div
                key={curr.code}
                onClick={() => setTempSelectedCode(curr.code)}
                className={`w-full min-h-[64px] px-5 py-3 rounded-[12px] flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#F2FAF5] border-[1.5px] border-[#0D8C47]"
                    : "bg-[#F7FAFC] border-[1.5px] border-transparent hover:bg-[#EEF2F6]"
                }`}
              >
                {/* Text Block (#107:218) */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-[#14171C]">
                    {curr.name}
                  </span>
                  <span className="text-[12px] font-normal text-[#8C9199]">
                    {curr.code}
                  </span>
                </div>

                {/* Radio/Check Circle (#107:221 / #107:226) */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#0D8C47] text-white"
                      : "border-2 border-[#CCD1D9] bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Apply Button (#107:215: 48px height, bg #0D8C47, borderRadius 10px) */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full h-[48px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.99] flex-shrink-0"
        >
          Применить
        </button>
      </div>
    </div>
  );
};
