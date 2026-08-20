"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface VerificationTabProps {
  onBack?: () => void;
}

/**
 * Вкладка "Верификация" — 100% Pixel-Perfect по нодам Figma:
 * - Desktop (#8:154)
 * - Mobile (#22:1397)
 */
export const VerificationTab: React.FC<VerificationTabProps> = ({ onBack }) => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleUpload = () => {
    setFileUploaded(true);
    alert("Документ успешно загружен!");
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
      {/* Кнопка возврата в ЛК для мобильной версии */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="lg:hidden flex items-center gap-1.5 text-[14px] font-semibold text-[#0D8C47] hover:underline self-start cursor-pointer -mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад в профиль</span>
        </button>
      )}

      {/* Заголовок (#8:188 / #22:1397: Inter Bold 24px/28px #14171C) */}
      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        Верификация
      </h1>

      {/* StepsCard (#8:215 / #22:1397: 1064px, bg #FFFFFF, borderRadius 12px/14px) */}
      <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-6 lg:p-8 flex flex-col gap-4 border border-[#E5E8ED]">
        {/* Title (#8:217) */}
        <h2 className="text-[16px] lg:text-[18px] font-bold text-[#14171C]">
          Как пройти верификацию
        </h2>

        {/* Lines */}
        <div className="flex flex-col gap-2.5 lg:gap-3">
          <p className="text-[14px] text-[#40454D] font-normal">
            1.&nbsp;&nbsp;Подготовить документы<span className="hidden sm:inline">&nbsp;— паспорт или загранпаспорт</span>
          </p>
          <p className="text-[14px] text-[#40454D] font-normal">
            2.&nbsp;&nbsp;Загрузить фото или сканы<span className="hidden sm:inline">&nbsp;документов</span>
          </p>
          <p className="text-[14px] text-[#40454D] font-normal">
            3.&nbsp;&nbsp;Отправить на верификацию
          </p>
          <p className="text-[14px] text-[#40454D] font-normal">
            4.&nbsp;&nbsp;Дождаться подтверждения<span className="hidden sm:inline">&nbsp;— ответим в течение 2 минут</span>
          </p>
        </div>

        {/* StartButton (#8:222 / #22:1406: full-width on mobile, 220px on desktop) */}
        <button
          type="button"
          onClick={handleUpload}
          className="w-full lg:w-[220px] h-[44px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold rounded-[10px] lg:rounded-[8px] flex items-center justify-center transition-colors mt-2 active:scale-[0.98] cursor-pointer"
        >
          Начать верификацию
        </button>
      </div>

      {/* Desktop UploadCard (#8:216: visible on desktop) */}
      <div
        onClick={handleUpload}
        className="hidden lg:flex w-full h-[120px] bg-white rounded-[12px] border border-[#E5E8ED] hover:border-[#0D8C47] flex-col items-center justify-center gap-1 cursor-pointer transition-colors px-4 text-center"
      >
        <span className="text-[14px] font-semibold text-[#14171C]">
          {fileUploaded
            ? "Файл passport_verified.pdf загружен ✓"
            : "Перетащите файл сюда или нажмите, чтобы загрузить"}
        </span>
        <span className="text-[12px] font-normal text-[#8C9199]">
          JPG, PNG или PDF, до 10 МБ
        </span>
      </div>
    </div>
  );
};
