"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { sendPhoneVerificationCode, verifyPhoneChange } from "@/services/api";

interface EditPhoneViewProps {
  currentPhone: string;
  onBack: () => void;
  onSuccess: (newPhone: string) => void;
}

export const EditPhoneView: React.FC<EditPhoneViewProps> = ({
  currentPhone,
  onBack,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [newPhone, setNewPhone] = useState<string>("");
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(59);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const digitRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.startsWith("7") || raw.startsWith("8")) raw = raw.slice(1);
    raw = raw.slice(0, 10);

    let formatted = "";
    if (raw.length > 0) {
      formatted = raw.slice(0, 3);
      if (raw.length > 3) formatted += " " + raw.slice(3, 6);
      if (raw.length > 6) formatted += " " + raw.slice(6, 8);
      if (raw.length > 8) formatted += " " + raw.slice(8, 10);
    }
    setNewPhone(formatted);
    setErrorMsg("");
  };

  const handleSendCode = async () => {
    const cleanPhone = newPhone.replace(/\s/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Введите полный 10-значный номер телефона");
      return;
    }
    setIsLoading(true);
    try {
      await sendPhoneVerificationCode(`+7${cleanPhone}`);
      setTimer(59);
      setStep(2);
    } catch {
      setErrorMsg("Ошибка отправки кода. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, "").slice(-1);
    const newArr = [...code];
    newArr[index] = clean;
    setCode(newArr);
    setErrorMsg("");

    if (clean && index < 3) {
      digitRefs[index + 1].current?.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      digitRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyCode = async () => {
    if (code.some((d) => !d)) {
      setErrorMsg("Введите все 4 цифры проверочного кода");
      return;
    }
    setIsLoading(true);
    try {
      await verifyPhoneChange(`+7${newPhone.replace(/\s/g, "")}`, code.join(""));
      setStep(3);
      onSuccess(`+7 ${newPhone}`);
    } catch {
      setErrorMsg("Неверный код подтверждения");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
      {/* Кнопка назад */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-[14px] font-semibold text-[#0D8C47] hover:underline self-start cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к профилю</span>
      </button>

      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        Изменение номера телефона
      </h1>

      <div className="w-full max-w-[520px] bg-white rounded-[14px] p-6 lg:p-7 flex flex-col gap-5 border border-[#E5E8ED] shadow-xs">
        {/* Шаг 1: Ввод нового номера */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#8C9199]">Текущий номер:</span>
              <span className="text-[15px] font-medium text-[#14171C]">{currentPhone}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#40454D]">
                Новый номер телефона
              </label>
              <div className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D8C47] transition-all">
                <span className="text-[15px] font-medium text-[#14171C] select-none">+7</span>
                <input
                  type="tel"
                  placeholder="900 000 00 00"
                  value={newPhone}
                  onChange={handlePhoneChange}
                  autoFocus
                  className="w-full bg-transparent text-[15px] font-medium text-[#14171C] placeholder-[#8C9199] focus:outline-none"
                />
              </div>
              {errorMsg && <span className="text-[12px] text-[#BF2626]">{errorMsg}</span>}
            </div>

            <button
              type="button"
              disabled={isLoading || newPhone.replace(/\s/g, "").length < 10}
              onClick={handleSendCode}
              className="w-full h-[48px] bg-[#0D8C47] hover:bg-[#0D6638] disabled:opacity-50 text-white text-[14px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? "Отправка..." : "Получить SMS-код"}
            </button>
          </div>
        )}

        {/* Шаг 2: Ввод кода из SMS */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-[14px] text-[#40454D]">
                Мы отправили 4-значный код в SMS на номер:
              </p>
              <span className="text-[15px] font-semibold text-[#14171C]">
                +7 {newPhone}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#40454D]">
                Код из SMS
              </label>
              <div className="flex gap-3 justify-center py-1">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    ref={digitRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={code[i]}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleDigitKeyDown(i, e)}
                    className="w-[54px] h-[54px] rounded-[10px] bg-[#F2F5F7] text-center text-[20px] font-bold text-[#14171C] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                  />
                ))}
              </div>
              {errorMsg && (
                <span className="text-[12px] text-[#BF2626] text-center">{errorMsg}</span>
              )}
            </div>

            <div className="flex items-center justify-between text-[13px] text-[#8C9199]">
              {timer > 0 ? (
                <span>Повторный код через {timer} сек</span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="text-[#0D8C47] font-medium hover:underline cursor-pointer"
                >
                  Отправить код повторно
                </button>
              )}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#666B73] hover:underline cursor-pointer"
              >
                Изменить номер
              </button>
            </div>

            <button
              type="button"
              disabled={isLoading || code.some((d) => !d)}
              onClick={handleVerifyCode}
              className="w-full h-[48px] bg-[#0D8C47] hover:bg-[#0D6638] disabled:opacity-50 text-white text-[14px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-xs active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? "Проверка..." : "Подтвердить"}
            </button>
          </div>
        )}

        {/* Шаг 3: Успешное завершение */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center gap-4 py-2">
            <div className="w-14 h-14 rounded-full bg-[#E3F7EB] text-[#0D8C47] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] font-bold text-[#14171C]">
                Номер успешно изменён!
              </h3>
              <p className="text-[14px] text-[#666B73]">
                Новый номер <span className="font-semibold text-[#14171C]">+7 {newPhone}</span> привязан к вашему аккаунту.
              </p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="w-full h-[48px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-xs mt-2 cursor-pointer"
            >
              Вернуться в профиль
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
