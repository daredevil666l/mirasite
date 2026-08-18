"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/data/mockData";
import { TransactionRecord } from "@/types";

interface HistoryTabProps {
  onStartNewTransfer?: (country?: string) => void;
}

/**
 * Вкладка "История переводов" и экран "Детали перевода":
 * - Desktop (#8:63 / #22:1603)
 * - Mobile (#22:1344 / #22:1603)
 */
export const HistoryTab: React.FC<HistoryTabProps> = ({ onStartNewTransfer }) => {
  const router = useRouter();
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);

  const [currency, setCurrency] = useState("");
  const [country, setCountry] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleRepeatTransfer = (tx: TransactionRecord) => {
    if (onStartNewTransfer) {
      onStartNewTransfer(tx.country);
    } else {
      router.push(`/transfer?country=${encodeURIComponent(tx.country)}&recipient=${encodeURIComponent(tx.recipient)}`);
    }
  };

  // Если выбран перевод -> Экран "Детали перевода" (#22:1603)
  if (selectedTx) {
    return (
      <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
        <button
          onClick={() => setSelectedTx(null)}
          className="flex items-center gap-1.5 text-[14px] font-semibold text-[#0D8C47] hover:underline self-start cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к истории</span>
        </button>

        <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
          Детали перевода
        </h1>

        <div className="w-full max-w-[560px] bg-white rounded-[14px] p-6 lg:p-7 flex flex-col gap-4 border border-[#E5E8ED] shadow-xs">
          <div
            className={`w-fit px-3 py-1 rounded-[6px] text-[13px] font-semibold ${
              selectedTx.status === "success"
                ? "bg-[#E3F7EB] text-[#0D8C47]"
                : "bg-[#FCE5E5] text-[#BF2626]"
            }`}
          >
            {selectedTx.statusText}
          </div>

          <div className="flex flex-col gap-2.5 lg:gap-3 text-[14px] text-[#40454D] pt-1">
            <p>Дата перевода:&nbsp;&nbsp;{selectedTx.date}</p>
            <p>Сумма списания:&nbsp;&nbsp;{selectedTx.amountSend}</p>
            <p>Сумма зачисления:&nbsp;&nbsp;{selectedTx.amountReceive}</p>
            <p>Страна:&nbsp;&nbsp;{selectedTx.country}</p>
            <p>Получатель:&nbsp;&nbsp;{selectedTx.recipient}</p>
            <p className="leading-relaxed">
              Реквизит получателя:&nbsp;&nbsp;{selectedTx.requisites}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 lg:gap-3 pt-3">
            <button
              type="button"
              onClick={() => handleRepeatTransfer(selectedTx)}
              className="h-[44px] px-6 bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.98] cursor-pointer"
            >
              Повторить
            </button>


            <button
              type="button"
              onClick={() => alert("Перевод добавлен в избранное")}
              className="h-[44px] px-5 bg-[#F2F5F7] hover:bg-[#E5E8ED] text-[#14171C] text-[14px] font-semibold rounded-[10px] flex items-center justify-center transition-colors"
            >
              В избранное
            </button>

            <button
              type="button"
              onClick={() => alert("Обращение в поддержку по данному переводу...")}
              className="h-[44px] px-5 bg-[#F2F5F7] hover:bg-[#E5E8ED] text-[#14171C] text-[14px] font-semibold rounded-[10px] flex items-center justify-center transition-colors"
            >
              В поддержку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
      {/* Заголовок (#8:97 / #22:1346: Inter Bold 24px/28px #14171C) */}
      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        История переводов
      </h1>

      {/* Desktop FiltersBar (#8:124) */}
      <div className="hidden lg:flex w-full bg-white rounded-[12px] p-5 items-center gap-4">
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="Валюта перевода"
          className="h-[44px] px-3.5 rounded-[8px] bg-[#F2F5F7] text-[13px] font-normal text-[#14171C] placeholder-[#8C9199] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0D8C47] flex-1 min-w-[150px]"
        />

        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Страна"
          className="h-[44px] px-3.5 rounded-[8px] bg-[#F2F5F7] text-[13px] font-normal text-[#14171C] placeholder-[#8C9199] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0D8C47] flex-1 min-w-[150px]"
        />

        <input
          type="text"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          placeholder="Период с — дд.мм.гггг"
          className="h-[44px] px-3.5 rounded-[8px] bg-[#F2F5F7] text-[13px] font-normal text-[#14171C] placeholder-[#8C9199] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0D8C47] flex-1 min-w-[170px]"
        />

        <input
          type="text"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          placeholder="Период по — дд.мм.гггг"
          className="h-[44px] px-3.5 rounded-[8px] bg-[#F2F5F7] text-[13px] font-normal text-[#14171C] placeholder-[#8C9199] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0D8C47] flex-1 min-w-[175px]"
        />

        <button
          type="button"
          onClick={() => alert("Фильтры применены")}
          className="w-[140px] h-[44px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold rounded-[8px] flex items-center justify-center transition-colors flex-shrink-0 active:scale-[0.98]"
        >
          Применить
        </button>
      </div>

      {/* Desktop Table (#98:61) */}
      <div className="hidden lg:flex w-full bg-white rounded-[12px] p-6 flex-col">
        <div className="grid grid-cols-5 pb-4 border-b border-[#F2F5F7] text-[13px] font-normal text-[#8C9199]">
          <div>Дата</div>
          <div>Сумма</div>
          <div>Страна</div>
          <div>Получатель</div>
          <div>Статус</div>
        </div>

        <div className="divide-y divide-[#F2F5F7]">
          {MOCK_TRANSACTIONS.map((row) => (
            <div
              key={row.id}
              onClick={() => setSelectedTx(row)}
              className="grid grid-cols-5 py-4 items-center hover:bg-[#FAFBFC] cursor-pointer transition-colors text-[14px]"
            >
              <div className="text-[13px] text-[#8C9199]">{row.date}</div>
              <div className="font-semibold text-[#14171C]">{row.amountSend}</div>
              <div className="text-[#40454D]">{row.country}</div>
              <div className="text-[#40454D]">{row.recipient}</div>
              <div>
                {row.status === "success" ? (
                  <span className="inline-flex px-3 py-1 rounded-[6px] bg-[#F2FAF5] text-[#0D8C47] text-[12px] font-semibold">
                    {row.statusText}
                  </span>
                ) : (
                  <span className="inline-flex px-3 py-1 rounded-[6px] bg-[#FCE5E5] text-[#BF2626] text-[12px] font-semibold">
                    {row.statusText}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card List (#22:1388 - #22:1390: width 335px, height 64px, padding 14px 18px) */}
      <div className="lg:hidden flex flex-col gap-3.5 w-full">
        {MOCK_TRANSACTIONS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTx(item)}
            className="w-full bg-white rounded-[14px] px-5 py-4 flex flex-col justify-center gap-1 cursor-pointer active:bg-[#F2F5F7] transition-colors"
          >
            {/* Line 1 (#22:1391: Inter SemiBold 15px #14171C) */}
            <span className="text-[15px] font-semibold text-[#14171C]">
              {item.amountSend} → {item.country}
            </span>
            {/* Line 2 (#22:1392: 13px Regular + status color) */}
            <span
              className={`text-[13px] font-normal ${
                item.status === "success" ? "text-[#0D8C47]" : "text-[#BF2626]"
              }`}
            >
              {item.date} · {item.statusText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
