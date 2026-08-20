"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle2, Copy, Download } from "lucide-react";


export interface HistoryTransaction {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  recipientName: string;
  recipientCountry: string;
  recipientBank: string;
  recipientAccount: string;
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  rate: number;
  fee: number;
  sourceBank: string;
  status: "success" | "pending" | "canceled";
  statusText: string;
}

interface TransferDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: HistoryTransaction | null;
  onRepeatTransfer?: (tx: HistoryTransaction) => void;
}

/**
 * Модальное окно "Детали перевода" — 100% Pixel-Perfect по нодам Figma #22:1603 (Desktop) и #35:3350 (Mobile)
 */
export const TransferDetailsModal: React.FC<TransferDetailsModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onRepeatTransfer,
}) => {
  const router = useRouter();
  if (!isOpen || !transaction) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Скопировано: ${text}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim */}
      <div
        className="fixed inset-0 bg-[#0A0F17]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[460px] bg-white rounded-[20px] p-6 sm:p-7 shadow-[0px_12px_32px_rgba(0,0,0,0.14)] z-10 flex flex-col gap-5 border border-[#E5E8ED]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-bold text-[#14171C]">
            Детали перевода
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2F5F7] flex items-center justify-center text-[#666B73] hover:bg-[#E5E8ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badge & Amounts Card */}
        <div className="p-4 rounded-[12px] bg-[#F7FAFC] border border-[#EEF2F5] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#8C9199]">
              № {transaction.orderNumber}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F2FAF5] text-[#0D8C47] text-[12px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{transaction.statusText}</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[12px] text-[#8C9199]">Отправлено</span>
              <span className="text-[20px] font-bold text-[#14171C]">
                {transaction.sendAmount.toLocaleString("ru-RU")} {transaction.sendCurrency}
              </span>
            </div>
            <span className="text-[16px] text-[#8C9199] font-light">→</span>
            <div className="flex flex-col text-right">
              <span className="text-[12px] text-[#8C9199]">Получено</span>
              <span className="text-[20px] font-bold text-[#0D8C47]">
                {transaction.receiveAmount.toLocaleString("ru-RU")} {transaction.receiveCurrency}
              </span>
            </div>
          </div>
        </div>

        {/* Info Rows */}
        <div className="flex flex-col gap-2.5 text-[13px] border-y border-[#F2F5F7] py-3 text-[#40454D]">
          <div className="flex justify-between">
            <span className="text-[#8C9199]">Дата и время:</span>
            <span className="font-medium text-[#14171C]">
              {transaction.date}, {transaction.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C9199]">Получатель:</span>
            <span className="font-medium text-[#14171C]">
              {transaction.recipientName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C9199]">Страна получения:</span>
            <span className="font-medium text-[#14171C]">
              {transaction.recipientCountry}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C9199]">Банк получения:</span>
            <span className="font-medium text-[#14171C]">
              {transaction.recipientBank}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8C9199]">Счёт / Телефон:</span>
            <div className="flex items-center gap-1.5 font-medium text-[#14171C]">
              <span>{transaction.recipientAccount}</span>
              <button
                onClick={() => copyToClipboard(transaction.recipientAccount)}
                className="text-[#0D8C47] hover:text-[#0D6638] cursor-pointer"
                title="Скопировать"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C9199]">Списано с карты:</span>
            <span className="font-medium text-[#14171C]">
              {transaction.sourceBank}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C9199]">Курс перевода:</span>
            <span className="font-medium text-[#14171C]">
              1 RUB = {transaction.rate} {transaction.receiveCurrency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C9199]">Комиссия сервиса:</span>
            <span className="font-medium text-[#0D8C47]">
              {transaction.fee} ₽ (0%)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              alert(`Квитанция по переводу №${transaction.orderNumber} скачивается...`);
            }}
            className="flex-1 h-[48px] rounded-[10px] bg-[#F2F5F7] hover:bg-[#E5E8ED] text-[#14171C] text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Квитанция PDF</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onRepeatTransfer) {
                onRepeatTransfer(transaction);
              } else {
                const isCard = transaction.recipientAccount.replace(/\s/g, "").length >= 16;
                const params = new URLSearchParams({
                  country: transaction.recipientCountry,
                  recipient: transaction.recipientName,
                  amount: transaction.sendAmount.toString(),
                  bank: transaction.recipientBank,
                  account: transaction.recipientAccount,
                  tab: isCard ? "card" : "phone",
                  repeat: "1",
                  step: "5",
                });
                router.push(`/transfer?${params.toString()}`);
              }
              onClose();
            }}
            className="flex-1 h-[48px] rounded-[10px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          >
            Повторить перевод
          </button>
        </div>
      </div>
    </div>
  );
};
