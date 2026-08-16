"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";

const CITIZENSHIP_OPTIONS = [
  { id: "ru", name: "Россия", flag: "/images/flag_ru.png" },
  { id: "uz", name: "Узбекистан", flag: "/images/flag_uz.png" },
  { id: "tj", name: "Таджикистан", flag: "/images/flag_tj.png" },
  { id: "kg", name: "Кыргызстан", flag: "/images/flag_kg.png" },
  { id: "by", name: "Беларусь", flag: "/images/flag_by.png" },
  { id: "cn", name: "Китай", flag: "/images/flag_cn.png" },
];

/**
 * 100% Pixel-Perfect визард регистрации по макетам Figma Desktop (#11:655 - #11:755) и Mobile (#11:940 - #13:1029)
 */
export const RegistrationWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  // Поля формы
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(59);
  const [citizenship, setCitizenship] = useState<string>("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);

  // Паспорт (Шаг 4)
  const [surname, setSurname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [docNum, setDocNum] = useState<string>("");
  const [docExpiry, setDocExpiry] = useState<string>("");

  // Адрес (Шаг 5)
  const [addressCountry, setAddressCountry] = useState<string>("");
  const [addressCity, setAddressCity] = useState<string>("");
  const [addressStreet, setAddressStreet] = useState<string>("");
  const [addressHouse, setAddressHouse] = useState<string>("");

  // Согласия (Шаг 6) - по умолчанию не выбраны
  const [consent1, setConsent1] = useState<boolean>(false);
  const [consent2, setConsent2] = useState<boolean>(false);

  const digitRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Обратный отсчет таймера для SMS
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Маска телефона
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
    setPhone(formatted);
  };

  // Ввод кода
  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = clean;
    setCode(newCode);

    if (clean && index < 3) {
      digitRefs[index + 1].current?.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      digitRefs[index - 1].current?.focus();
    }
  };

  // Переход по шагам
  const handleNextStep = () => {
    if (step === 1) {
      if (phone.replace(/\s/g, "").length < 10) {
        alert("Пожалуйста, введите корректный номер телефона");
        return;
      }
      setTimer(59);
      setStep(2);
    } else if (step === 2) {
      if (code.some((d) => !d)) {
        alert("Пожалуйста, введите 4-значный код из SMS");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!citizenship) {
        alert("Пожалуйста, выберите страну гражданства");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!surname || !name) {
        alert("Пожалуйста, заполните фамилию и имя");
        return;
      }
      setStep(5);
    } else if (step === 5) {
      if (!addressCountry || !addressCity) {
        alert("Пожалуйста, укажите страну и город проживания");
        return;
      }
      setStep(6);
    } else if (step === 6) {
      if (!consent1 || !consent2) {
        alert("Для продолжения необходимо подтвердить согласия");
        return;
      }
      alert("🎉 Регистрация успешно завершена! Аккаунт создан.");
      window.location.href = "/";
    }
  };

  const progressPercent = Math.round((step / 6) * 100);

  return (
    <div className="min-h-screen w-full bg-[#F7FAFC] sm:bg-[#F7FAFC] flex items-center justify-center p-0 sm:p-6 lg:p-10 font-sans antialiased">
      {/* Карточка визарда (#11:656: Desktop 480px borderRadius 20px, Mobile на весь экран 375px) */}
      <div className="w-full sm:max-w-[480px] min-h-screen sm:min-h-0 bg-white sm:rounded-[20px] p-6 sm:p-[40px] flex flex-col gap-5 sm:border sm:border-[#E5E8ED] sm:shadow-[0px_12px_32px_rgba(0,0,0,0.06)] justify-start sm:justify-center">
        
        {/* Логотип внутри карточки (#11:656 / #11:940) */}
        <div className="flex items-center justify-between pb-1">
          <Link href="/" className="relative w-[94px] h-[36px] block">
            <Image
              src="/images/logo.png"
              alt="MiraMoney"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>
        </div>

        {/* Прогресс-бар (#11:658: w 400px, h 6px, bg #E5E8ED, borderRadius 3px) */}
        <div className="w-full h-[6px] rounded-[3px] bg-[#E5E8ED] overflow-hidden -mt-1">
          <div
            className="h-full bg-[#0D8C47] rounded-[3px] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Шаг N из 6 (#11:660: Inter SemiBold 12px, #8C9199) */}
        <span className="text-[12px] font-semibold text-[#8C9199] -mt-1">
          Шаг {step} из 6
        </span>

        {/* ================= ШАГ 1: Телефон (#11:655 / #11:940) ================= */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[21px] sm:text-[24px] font-bold text-[#14171C]">
                Регистрация и вход
              </h1>
              <p className="text-[14px] text-[#666B73] leading-relaxed">
                Укажите номер телефона — на него придёт код для входа в личный кабинет
              </p>
            </div>

            {/* FieldPhone (#11:663: 400x50px, bg #F2F5F7, borderRadius 10px, prefix +7) */}
            <div className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D8C47] transition-all">
              <span className="text-[15px] font-medium text-[#14171C] select-none">
                +7
              </span>
              <input
                type="tel"
                placeholder="Номер телефона"
                value={phone}
                onChange={handlePhoneChange}
                autoFocus
                className="w-full bg-transparent text-[15px] font-medium text-[#14171C] placeholder-[#8C9199] focus:outline-none"
              />
            </div>

            {/* SubmitButton (#11:666: w 400px, h 50px, bg #0D8C47, "Отправить код") */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1"
            >
              Отправить код
            </button>
          </div>
        )}

        {/* ================= ШАГ 2: Введите код (#11:668 / #11:952) ================= */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[21px] sm:text-[24px] font-bold text-[#14171C]">
                Введите код
              </h1>
              <p className="text-[14px] text-[#666B73] leading-relaxed">
                Мы отправили код подтверждения на номер +7 {phone ? phone.slice(0, 3) + " ***-**-" + phone.slice(-2) : "900 ***-**-89"}
              </p>
            </div>

            {/* CodeBoxes (#11:681: 4 ячейки) */}
            <div className="flex items-center justify-between gap-3 my-1">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  ref={digitRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code[idx]}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                  className="w-[56px] sm:w-[68px] h-[56px] sm:h-[68px] text-center text-[22px] font-bold text-[#14171C] bg-[#F2F5F7] rounded-[10px] border border-transparent focus:border-[#0D8C47] focus:bg-white focus:outline-none transition-all"
                />
              ))}
            </div>

            {/* SubmitButton (#11:686: "Подтвердить") */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98]"
            >
              Подтвердить
            </button>

            {/* Таймер повторной отправки (#11:688) */}
            <div className="text-center text-[13px] text-[#8C9199]">
              {timer > 0 ? (
                <span>
                  Отправить код повторно через 00:{timer < 10 ? `0${timer}` : timer}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTimer(59);
                    alert("Новый SMS-код отправлен.");
                  }}
                  className="text-[#0D8C47] font-semibold hover:underline"
                >
                  Отправить код повторно
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= ШАГ 3: Гражданство (#11:689 / #13:971) ================= */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[21px] sm:text-[24px] font-bold text-[#14171C]">
                Гражданство
              </h1>
              <p className="text-[14px] text-[#666B73] leading-relaxed">
                Укажите страну вашего гражданства — это понадобится для проверки лимитов
              </p>
            </div>

            {/* CitizenshipSelect (#11:705: 400x50px, bg #F2F5F7, placeholder "Выберите страну") */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="w-full h-[50px] px-4 rounded-[10px] bg-[#F2F5F7] hover:bg-[#E5E8ED] transition-colors flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`text-[15px] font-medium ${citizenship ? "text-[#14171C]" : "text-[#8C9199]"}`}>
                  {citizenship || "Выберите страну"}
                </span>
                <span className="text-[14px] text-[#8C9199]">▾</span>
              </button>

              {/* Выпадающий список */}
              {isCountryDropdownOpen && (
                <div className="absolute top-[56px] left-0 w-full bg-white rounded-[12px] shadow-lg border border-[#E5E8ED] z-20 py-1 max-h-[220px] overflow-y-auto">
                  {CITIZENSHIP_OPTIONS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCitizenship(item.name);
                        setIsCountryDropdownOpen(false);
                      }}
                      className="px-4 py-2.5 hover:bg-[#F2FAF5] flex items-center justify-between cursor-pointer text-[14px] font-medium text-[#14171C]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 shadow-xs">
                          <Image
                            src={item.flag}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      {citizenship === item.name && (
                        <Check className="w-4 h-4 text-[#0D8C47]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SubmitButton (#11:708: "Продолжить") */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1"
            >
              Продолжить
            </button>
          </div>
        )}

        {/* ================= ШАГ 4: Паспортные данные (#11:710 / #13:990) ================= */}
        {step === 4 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[21px] sm:text-[24px] font-bold text-[#14171C]">
                Паспортные данные
              </h1>
              <p className="text-[14px] text-[#666B73] leading-relaxed">
                Заполните данные документа, удостоверяющего личность
              </p>
            </div>

            {/* 4 поля 2x2 (#11:723, #11:724: Фамилия, Имя, Серия и номер, Срок действия) */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Фамилия"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Серия и номер"
                  value={docNum}
                  onChange={(e) => setDocNum(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Срок действия"
                  value={docExpiry}
                  onChange={(e) => setDocExpiry(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* SubmitButton (#11:733: "Продолжить") */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1"
            >
              Продолжить
            </button>
          </div>
        )}

        {/* ================= ШАГ 5: Адрес проживания (#11:735 / #13:1012) ================= */}
        {step === 5 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[21px] sm:text-[24px] font-bold text-[#14171C]">
                Адрес проживания
              </h1>
              <p className="text-[14px] text-[#666B73] leading-relaxed">
                Укажите фактический адрес проживания
              </p>
            </div>

            {/* 4 поля 2x2 (#11:743, #11:748: Страна, Город, Улица, Дом, квартира) */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Страна"
                  value={addressCountry}
                  onChange={(e) => setAddressCountry(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Город"
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Улица"
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Дом, квартира"
                  value={addressHouse}
                  onChange={(e) => setAddressHouse(e.target.value)}
                  className="w-full h-[50px] rounded-[10px] bg-[#F2F5F7] px-4 text-[14px] font-medium text-[#14171C] placeholder-[#8C9199] focus:bg-white focus:ring-2 focus:ring-[#0D8C47] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* SubmitButton (#11:753: "Продолжить") */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1"
            >
              Продолжить
            </button>
          </div>
        )}

        {/* ================= ШАГ 6: Согласие на обработку данных (#11:755 / #13:1029) ================= */}
        {step === 6 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[21px] sm:text-[24px] font-bold text-[#14171C]">
                Согласие на обработку данных
              </h1>
              <p className="text-[14px] text-[#666B73] leading-relaxed">
                Последний шаг — подтвердите согласия, и аккаунт будет создан
              </p>
            </div>

            {/* Чекбоксы (#11:775, #11:776) */}
            <div className="flex flex-col gap-3.5 my-1">
              {/* Согласие 1 */}
              <div
                onClick={() => setConsent1(!consent1)}
                className="flex items-start gap-3 cursor-pointer select-none"
              >
                <div
                  className={`w-5 h-5 rounded-[5px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    consent1 ? "bg-[#0D8C47] text-white" : "border border-[#CCD1D9] bg-white"
                  }`}
                >
                  {consent1 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-[13px] text-[#40454D] leading-normal">
                  Даю согласие на обработку персональных данных в соответствии с 152-ФЗ
                </span>
              </div>

              {/* Согласие 2 */}
              <div
                onClick={() => setConsent2(!consent2)}
                className="flex items-start gap-3 cursor-pointer select-none"
              >
                <div
                  className={`w-5 h-5 rounded-[5px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    consent2 ? "bg-[#0D8C47] text-white" : "border border-[#CCD1D9] bg-white"
                  }`}
                >
                  {consent2 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-[13px] text-[#40454D] leading-normal">
                  Согласен с Пользовательским соглашением и Политикой конфиденциальности
                </span>
              </div>
            </div>

            {/* SubmitButton (#11:781: "Завершить регистрацию") */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-[50px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.98] mt-1"
            >
              Завершить регистрацию
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
