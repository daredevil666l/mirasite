"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { formatMoney, parseMoney } from "@/lib/utils";

import { CurrencySelectorModal } from "../calculator/CurrencySelectorModal";
import { Currency } from "@/types";
import { Check, X, ArrowLeft } from "lucide-react";

export interface TransferWizardProps {
  initialCountryName?: string;
  isModal?: boolean;
  onClose?: () => void;
}

// Банки по странам
const BANKS_BY_COUNTRY: Record<string, { id: string; name: string }[]> = {
  "Узбекистан": [
    { id: "hamkor", name: "Hamkorbank" },
    { id: "agro", name: "Agrobank" },
    { id: "aloqa", name: "Aloqabank" },
    { id: "kapital", name: "Kapitalbank" },
    { id: "ipak", name: "Ipak Yoli Bank" },
  ],
  "Китай": [
    { id: "alipay", name: "Alipay" },
    { id: "wechat", name: "WeChat Pay" },
    { id: "icbc", name: "ICBC Bank" },
    { id: "boc", name: "Bank of China" },
  ],
  "Беларусь": [
    { id: "belarus", name: "Беларусбанк" },
    { id: "prior", name: "Приорбанк" },
    { id: "mtbank", name: "МТБанк" },
  ],
  "Россия": [
    { id: "sber", name: "Сбербанк" },
    { id: "tbank", name: "Т-Банк" },
    { id: "vtb", name: "ВТБ" },
    { id: "alpha", name: "Альфа-Банк" },
  ],
  "Кыргызстан": [
    { id: "mbank", name: "MBANK" },
    { id: "optima", name: "Оптима Банк" },
    { id: "bakai", name: "Бакай Банк" },
  ],
  "Таджикистан": [
    { id: "alif", name: "Алиф Банк" },
    { id: "eskhata", name: "Банк Эсхата" },
    { id: "dushanbe", name: "Душанбе Сити" },
  ],
};

// Источники списания (#11:885 - #11:888)
const PAYMENT_SOURCES = [
  { id: "sber", name: "Сбербанк", letter: "С", bg: "#21A038", textColor: "#FFFFFF" },
  { id: "tbank", name: "Т-Банк", letter: "Т", bg: "#FFDD2D", textColor: "#1A1A1A" },
  { id: "alpha", name: "Альфа-Банк", letter: "А", bg: "#EF3124", textColor: "#FFFFFF" },
  { id: "vtb", name: "ВТБ", letter: "В", bg: "#0A2882", textColor: "#FFFFFF" },
];

const CURRENCY_RATES: Record<string, { code: string; name: string; rate: number }> = {
  "Узбекистан": { code: "UZS", name: "Узбекский сум", rate: 153.66 },
  "Китай": { code: "CNY", name: "Китайский юань", rate: 0.082 },
  "Беларусь": { code: "BYN", name: "Белорусский рубль", rate: 0.038 },
  "Россия": { code: "RUB", name: "Российский рубль", rate: 1.0 },
  "Кыргызстан": { code: "KGS", name: "Кыргызский сом", rate: 0.94 },
  "Таджикистан": { code: "TJS", name: "Таджикский сомони", rate: 0.12 },
  "США (USD)": { code: "USD", name: "Доллар США", rate: 0.011 },
  "Европа (EUR)": { code: "EUR", name: "Евро", rate: 0.0105 },
};

/**
 * 6-шаговый сценарий перевода денег — 100% точное соответствие макету Figma Desktop (#11:783 - #11:920) и Mobile (#13:1054 - #13:1184)
 */
export const TransferWizard: React.FC<TransferWizardProps> = ({
  initialCountryName = "Узбекистан",
  isModal = false,
  onClose,
}) => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const [country, setCountry] = useState<string>(initialCountryName);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState<boolean>(false);

  // Шаг 1: Суммы
  const currentRate = CURRENCY_RATES[country]?.rate || 153.66;
  const currentCurrencyCode = CURRENCY_RATES[country]?.code || "UZS";

  const [sendAmount, setSendAmount] = useState<number>(15400);
  const [receiveAmount, setReceiveAmount] = useState<number>(Math.round(15400 * currentRate));
  const [sendInput, setSendInput] = useState<string>("15 400");
  const [receiveInput, setReceiveInput] = useState<string>(formatMoney(Math.round(15400 * currentRate)));

  // Шаг 2: Вкладки и банки
  const [activeTab, setActiveTab] = useState<"all" | "card" | "phone">("all");
  const availableBanks = BANKS_BY_COUNTRY[country] || BANKS_BY_COUNTRY["Узбекистан"] || [];
  const [selectedBank, setSelectedBank] = useState<string>(availableBanks[0]?.name || "Hamkorbank");

  // Шаг 3: Данные получателя (пустые по умолчанию)
  const [recipientPhone, setRecipientPhone] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [recipientFirstName, setRecipientFirstName] = useState<string>("");
  const [recipientLastName, setRecipientLastName] = useState<string>("");

  // Шаг 4: Откуда списать
  const [selectedSource, setSelectedSource] = useState<string>("Сбербанк");

  // Шаг 5: Таймер курса
  const [rateTimer, setRateTimer] = useState<number>(163); // 02:43

  // Синхронизация переданной страны и query params
  useEffect(() => {
    if (searchParams) {
      const qCountry = searchParams.get("country");
      const qRecipient = searchParams.get("recipient");
      const qAmount = searchParams.get("amount");

      if (qCountry && CURRENCY_RATES[qCountry]) {
        setCountry(qCountry);
      } else if (initialCountryName) {
        setCountry(initialCountryName);
      }

      if (qRecipient) {
        const parts = qRecipient.trim().split(/\s+/);
        if (parts.length >= 2) {
          setRecipientLastName(parts[0]);
          setRecipientFirstName(parts.slice(1).join(" "));
        } else {
          setRecipientFirstName(qRecipient);
        }
      }

      if (qAmount) {
        const parsed = parseInt(qAmount.replace(/\D/g, ""), 10);
        if (!isNaN(parsed) && parsed > 0) {
          setSendAmount(parsed);
          setSendInput(formatMoney(parsed));
          const rate = (qCountry && CURRENCY_RATES[qCountry]?.rate) || currentRate;
          const rec = Math.round(parsed * rate);
          setReceiveAmount(rec);
          setReceiveInput(formatMoney(rec));
        }
      }
    } else if (initialCountryName) {
      setCountry(initialCountryName);
    }
  }, [initialCountryName, searchParams]);

  useEffect(() => {
    const banks = BANKS_BY_COUNTRY[country] || BANKS_BY_COUNTRY["Узбекистан"];
    if (banks && banks.length > 0) {
      setSelectedBank(banks[0].name);
    }
  }, [country]);

  useEffect(() => {
    const calculated = Math.round(sendAmount * currentRate);
    setReceiveAmount(calculated);
    setReceiveInput(formatMoney(calculated));
  }, [country, currentRate, sendAmount]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if ((step === 5 || step === 6) && rateTimer > 0) {
      interval = setInterval(() => {
        setRateTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, rateTimer]);

  const handleSendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const rawNumber = parseMoney(val);
    setSendAmount(rawNumber);
    setSendInput(val.replace(/[^\d\s]/g, ""));

    const calculatedReceive = Math.round(rawNumber * currentRate);
    setReceiveAmount(calculatedReceive);
    setReceiveInput(formatMoney(calculatedReceive));
  };

  const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const rawNumber = parseMoney(val);
    setReceiveAmount(rawNumber);
    setReceiveInput(val.replace(/[^\d\s]/g, ""));

    if (currentRate > 0) {
      const calculatedSend = Math.round(rawNumber / currentRate);
      setSendAmount(calculatedSend);
      setSendInput(formatMoney(calculatedSend));
    }
  };

  const handleRecipientPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.startsWith("998")) raw = raw.slice(3);
    raw = raw.slice(0, 9);

    let formatted = "";
    if (raw.length > 0) {
      formatted = raw.slice(0, 2);
      if (raw.length > 2) formatted += " " + raw.slice(2, 5);
      if (raw.length > 5) formatted += " " + raw.slice(5, 7);
      if (raw.length > 7) formatted += " " + raw.slice(7, 9);
    }
    setRecipientPhone(formatted);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleCurrencySelect = (currency: Currency) => {
    const foundEntry = Object.entries(CURRENCY_RATES).find(
      ([, val]) => val.code === currency.code
    );
    if (foundEntry) {
      setCountry(foundEntry[0]);
    }
    setIsCurrencyModalOpen(false);
  };

  const progressPercent = Math.round((step / 6) * 100);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? `0${s}` : s}`;
  };

  const content = (
    /* Card (#11:784: 480px, p 40px, gap 20px, bg #FFFFFF, borderRadius 20px) */
    <div className="relative w-full max-w-[480px] bg-white rounded-[20px] p-6 sm:p-[40px] flex flex-col gap-5 border border-[#E5E8ED] shadow-[0px_12px_32px_rgba(0,0,0,0.08)]">
      
      {/* Кнопка закрытия для модального режима */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F2F5F7] flex items-center justify-center text-[#666B73] hover:bg-[#E5E8ED] transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Верхний заголовок направления (#11:785: Inter SemiBold 13px, #0D8C47) */}
      <div className="flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="flex items-center gap-1 text-[13px] font-semibold text-[#0D8C47] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Перевод в {country}</span>
          </button>
        ) : (
          <span className="text-[13px] font-semibold text-[#0D8C47]">
            Перевод в {country}
          </span>
        )}
      </div>

      {/* ProgressTrack (#11:786: w 400px, h 6px, bg #E5E8ED, borderRadius 3px) */}
      <div className="w-full h-[6px] rounded-[3px] bg-[#E5E8ED] overflow-hidden -mt-2">
        <div
          className="h-full bg-[#0D8C47] rounded-[3px] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Шаг N из 6 (#11:788: Inter SemiBold 12px, #8C9199) */}
      <span className="text-[12px] font-semibold text-[#8C9199] -mt-2">
        Шаг {step} из 6
      </span>

      {/* ================= ШАГ 1: Куда и сколько (#11:783 / #13:1054) ================= */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[24px] font-bold text-[#14171C]">
            Куда и сколько
          </h2>

          {/* CountrySelect (#11:790: 400x50px, bg #F2F5F7, borderRadius 10px) */}
          <button
            type="button"
            onClick={() => setIsCurrencyModalOpen(true)}
            className="w-full h-[50px] px-4 rounded-[10px] bg-[#F2F5F7] hover:bg-[#E5E8ED] transition-colors flex items-center justify-between text-left focus:outline-none cursor-pointer"
          >
            <span className="text-[15px] font-semibold text-[#333840]">
              {country} · {currentCurrencyCode}
            </span>
            <span className="text-[14px] text-[#999EA6]">▾</span>
          </button>

          {/* AmountField (#11:793: Сумма отправления, RUB) */}
          <div className="w-full h-[70px] rounded-[10px] bg-[#F2F5F7] px-4 py-3 flex flex-col justify-center gap-0.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D8C47] transition-all">
            <label className="text-[12px] text-[#999EA6] font-normal select-none">
              Сумма отправления, RUB
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={sendInput}
              onChange={handleSendChange}
              onBlur={() => setSendInput(formatMoney(sendAmount))}
              className="w-full bg-transparent text-[20px] font-bold text-[#14171C] focus:outline-none"
            />
          </div>

          {/* ReceiveAmountField (#101:111: Сумма получения) */}
          <div className="w-full h-[70px] rounded-[10px] bg-[#F2F5F7] px-4 py-3 flex flex-col justify-center gap-0.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D8C47] transition-all">
            <label className="text-[12px] text-[#999EA6] font-normal select-none">
              Сумма получения, {currentCurrencyCode}
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={receiveInput}
              onChange={handleReceiveChange}
              onBlur={() => setReceiveInput(formatMoney(receiveAmount))}
              className="w-full bg-transparent text-[20px] font-bold text-[#14171C] focus:outline-none"
            />
          </div>

          {/* Инфо о курсе (#101:114: Inter Medium 13px) */}
          <p className="text-[13px] font-medium text-[#8C9199]">
            Курс: 1 RUB = {currentRate.toString().replace(".", ",")} {currentCurrencyCode}
          </p>

          {/* SubmitButton (#102:115: 400x50px, bg #0D8C47) */}
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1 cursor-pointer"
          >
            Продолжить
          </button>
        </div>
      )}

      {/* ================= ШАГ 2: Реквизиты получателя (#11:799 / #13:1069) ================= */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[24px] font-bold text-[#14171C]">
            Реквизиты получателя
          </h2>

          {/* Tabs (#11:815: "Все" | "На карту" | "По телефону") */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#0D8C47] text-white"
                  : "bg-[#F2F5F7] text-[#666B73] hover:text-[#14171C]"
              }`}
            >
              Все
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("card")}
              className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer ${
                activeTab === "card"
                  ? "bg-[#0D8C47] text-white"
                  : "bg-[#F2F5F7] text-[#666B73] hover:text-[#14171C]"
              }`}
            >
              На карту
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("phone")}
              className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer ${
                activeTab === "phone"
                  ? "bg-[#0D8C47] text-white"
                  : "bg-[#F2F5F7] text-[#666B73] hover:text-[#14171C]"
              }`}
            >
              По телефону
            </button>
          </div>

          {/* Bank rows (#11:822: Hamkorbank, Agrobank, Aloqabank) — многострочный вывод */}
          <div className="flex flex-col gap-2.5 my-1">
            {availableBanks.slice(0, 3).map((bank) => {
              const isSelected = selectedBank === bank.name;
              return (
                <div
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.name)}
                  className={`w-full min-h-[58px] py-2.5 px-4 rounded-[10px] flex flex-col justify-center items-start gap-0.5 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[1.5px] border-[#0D8C47] bg-[#F2FAF5]"
                      : "border border-[#E5E8ED] bg-white hover:bg-[#F7FAFC]"
                  }`}
                >
                  <span className="text-[15px] font-semibold text-[#14171C]">
                    {bank.name}
                  </span>
                  <span className="text-[12px] text-[#8C9199]">
                    1 RUB = {currentRate} {currentCurrencyCode} · Комиссия 0 ₽
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1 cursor-pointer"
          >
            Продолжить
          </button>
        </div>
      )}

      {/* ================= ШАГ 3: Номер карты получателя (Вкладка "На карту") ================= */}
      {step === 3 && activeTab === "card" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[24px] font-bold text-[#14171C]">
            Номер карты получателя
          </h2>

          {/* CardNumberField */}
          <div className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D8C47] transition-all">
            <input
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="4998 8909 8989 7897"
              maxLength={19}
              autoFocus
              className="w-full bg-transparent text-[15px] font-semibold text-[#14171C] placeholder-[#8C9199] focus:outline-none tracking-wide"
            />
          </div>

          {/* Название банка выпустившего карту */}
          <div className="text-[12px] font-bold text-[#8C9199] tracking-wider uppercase pl-1 -mt-2">
            {selectedBank ? selectedBank.toUpperCase() : "HAMKOR BANK"}
          </div>

          {/* NameRow: Имя (латиницей) + Фамилия (латиницей) */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={recipientFirstName}
              onChange={(e) => setRecipientFirstName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
              placeholder="Имя получателя (латиницей)"
              className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
            />
            <input
              type="text"
              value={recipientLastName}
              onChange={(e) => setRecipientLastName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
              placeholder="Фамилия получателя (латиницей)"
              className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(4)}
            className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1 cursor-pointer"
          >
            Продолжить
          </button>
        </div>
      )}

      {/* ================= ШАГ 3: Данные получателя (Вкладки "Все" / "По телефону") ================= */}
      {step === 3 && activeTab !== "card" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[24px] font-bold text-[#14171C]">
            Данные получателя
          </h2>

          {/* PhoneField (#11:858: prefix +998, placeholder "90 123 45 67") */}
          <div className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D8C47] transition-all">
            <span className="text-[15px] font-semibold text-[#14171C] select-none">
              +998
            </span>
            <input
              type="tel"
              value={recipientPhone}
              onChange={handleRecipientPhoneChange}
              maxLength={12}
              autoFocus
              placeholder="90 123 45 67"
              className="w-full bg-transparent text-[15px] font-medium text-[#14171C] placeholder-[#8C9199] focus:outline-none"
            />
          </div>

          {/* NameRow (#11:861: Имя (латиницей) + Фамилия (латиницей)) */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={recipientFirstName}
              onChange={(e) => setRecipientFirstName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
              placeholder="Имя (латиницей)"
              className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[13px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
            />
            <input
              type="text"
              value={recipientLastName}
              onChange={(e) => setRecipientLastName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
              placeholder="Фамилия (латиницей)"
              className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[13px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(4)}
            className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1 cursor-pointer"
          >
            Продолжить
          </button>
        </div>
      )}

      {/* ================= ШАГ 4: Откуда списать (#11:868 / #13:1135) ================= */}
      {step === 4 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[24px] font-bold text-[#14171C]">
            Откуда списать
          </h2>

          {/* SourceRows (#11:885 - #11:888) */}
          <div className="flex flex-col gap-2.5 my-1">
            {PAYMENT_SOURCES.map((src) => {
              const isSelected = selectedSource === src.name;
              return (
                <div
                  key={src.id}
                  onClick={() => setSelectedSource(src.name)}
                  className={`w-full h-[50px] px-3.5 rounded-[10px] flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[1.5px] border-[#0D8C47] bg-[#F2FAF5]"
                      : "border border-transparent bg-[#F7FAFC] hover:bg-[#EEF2F5]"
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[13px] font-bold"
                    style={{ backgroundColor: src.bg, color: src.textColor }}
                  >
                    {src.letter}
                  </div>
                  <span className="text-[15px] font-semibold text-[#14171C]">
                    {src.name}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setStep(5)}
            className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1 cursor-pointer"
          >
            Продолжить
          </button>
        </div>
      )}

      {/* ================= ШАГ 5: Подтвердите реквизиты (#11:895 / #13:1160) ================= */}
      {step === 5 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[24px] font-bold text-[#14171C]">
            Подтвердите реквизиты
          </h2>

          {/* SendAmountField (#104:129: Сумма списания, RUB) */}
          <div className="w-full h-[70px] rounded-[10px] bg-[#F2F5F7] px-4 py-3 flex flex-col justify-center gap-0.5">
            <span className="text-[12px] text-[#999EA6]">Сумма списания, RUB</span>
            <span className="text-[20px] font-bold text-[#14171C]">{sendInput}</span>
          </div>

          {/* ReceiveAmountField (#104:136: Сумма к получению, UZS) */}
          <div className="w-full h-[70px] rounded-[10px] bg-[#F2F5F7] px-4 py-3 flex flex-col justify-center gap-0.5">
            <span className="text-[12px] text-[#999EA6]">Сумма к получению, {currentCurrencyCode}</span>
            <span className="text-[20px] font-bold text-[#14171C]">{receiveInput}</span>
          </div>

          {/* Курс (#104:139) */}
          <p className="text-[13px] font-medium text-[#8C9199]">
            Курс: 1 RUB = {currentRate.toString().replace(".", ",")} {currentCurrencyCode}
          </p>

          {/* DetailsCard (#104:140: bg #F7FAFC, padding 16px, gap 10px, text #4D5259 Inter 13px) */}
          <div className="w-full p-4 rounded-[10px] bg-[#F7FAFC] flex flex-col gap-2.5 text-[13px] text-[#4D5259]">
            <p>
              <span>Получатель:&nbsp;&nbsp;</span>
              <span className="font-bold text-[#14171C]">
                {recipientLastName || "Ismoilov"} {recipientFirstName || "Sherzod"}
              </span>
            </p>
            <p>
              <span>Банк получателя:&nbsp;&nbsp;</span>
              <span className="font-bold text-[#14171C]">
                {activeTab === "card" && cardNumber
                  ? `${selectedBank} (${cardNumber.slice(0, 4)} •••• ${cardNumber.slice(-4)})`
                  : selectedBank}
              </span>
            </p>
            <p>
              <span>Списание:&nbsp;&nbsp;</span>
              <span className="font-bold text-[#14171C]">
                {selectedSource}
              </span>
            </p>
            <p>
              <span>Комиссия:&nbsp;&nbsp;</span>
              <span className="font-bold text-[#14171C]">
                0 ₽
              </span>
            </p>
          </div>

          {/* Курс действителен (центрированный) */}
          <p className="text-center text-[13px] font-semibold text-[#BF800D]">
            Курс действителен ещё {formatTimer(rateTimer)}
          </p>

          {/* SubmitButton (#104:146: "Подтвердить перевод") */}
          <button
            type="button"
            onClick={() => setStep(6)}
            className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Подтвердить перевод
          </button>
        </div>
      )}

      {/* ================= ШАГ 6: Осталось завершить перевод (#11:920 / #13:1184) ================= */}
      {step === 6 && (
        <div className="flex flex-col gap-5 text-center items-center py-2">
          <h2 className="text-[22px] font-bold text-[#14171C]">
            Осталось завершить перевод
          </h2>
          <p className="text-[14px] text-[#666B73] leading-relaxed max-w-[380px]">
            Для завершения перевода перейдите по ссылке ниже
          </p>

          {/* Счетчик обратного отсчета */}
          <p className="text-center text-[13px] font-semibold text-[#BF800D]">
            Курс действителен ещё {formatTimer(rateTimer)}
          </p>

          <button
            type="button"
            onClick={() => {
              alert(`🎉 Перевод ${sendInput} RUB (${receiveInput} ${currentCurrencyCode}) успешно отправлен через ${selectedSource}!`);
              if (onClose) onClose();
              else window.location.href = "/";
            }}
            className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Перейти в приложение банка
          </button>
        </div>
      )}

      {/* Currency Modal (#107:208) */}
      <CurrencySelectorModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        selectedCurrencyCode={currentCurrencyCode}
        onSelectCurrency={handleCurrencySelect}
      />
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-[#0A0F17]/50 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
        <div className="relative z-10 w-full max-w-[480px]">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
