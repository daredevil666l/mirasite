"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { LEGAL_DOCUMENTS } from "@/data/mockData";
import { LegalDocument } from "@/types";

interface DocumentsTabProps {
  onBack?: () => void;
}

/**
 * Вкладка "Документы" — 100% Pixel-Perfect по нодам Figma:
 * - Desktop (#8:458 / #107:239): "Открыть →"
 * - Mobile (#22:1555 / #107:841): "›"
 */
export const DocumentsTab: React.FC<DocumentsTabProps> = ({ onBack }) => {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const selectedDoc = LEGAL_DOCUMENTS.find((d) => d.id === selectedDocId);

  if (selectedDoc) {
    return (
      <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
        {/* Кнопка возврата к списку документов */}
        <button
          onClick={() => setSelectedDocId(null)}
          className="flex items-center gap-1.5 text-[14px] font-semibold text-[#0D8C47] hover:underline self-start cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к документам</span>
        </button>

        {/* Заголовок документа */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
            {selectedDoc.title}
          </h1>
          <span className="text-[13px] text-[#8C9199]">
            {selectedDoc.updatedAt}
          </span>
        </div>

        {/* Card с секциями текста */}
        <div className="bg-white rounded-[14px] lg:rounded-[12px] p-6 lg:p-8 flex flex-col gap-6 border border-[#E5E8ED]">
          {selectedDoc.sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h3 className="text-[15px] font-bold text-[#14171C]">
                {section.title}
              </h3>
              <p className="text-[14px] text-[#40454D] leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

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

      {/* Заголовок (#8:492 / #22:1557: Inter Bold 24px/28px #14171C) */}
      <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
        Документы
      </h1>

      {/* DocsCard (#8:519 / #22:1578) */}
      <div className="w-full bg-white rounded-[14px] lg:rounded-[12px] p-2 flex flex-col divide-y divide-[#F2F5F7] border border-[#E5E8ED]">
        {LEGAL_DOCUMENTS.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setSelectedDocId(doc.id)}
            className="px-4 lg:px-6 py-3.5 lg:py-4 flex items-center justify-between hover:bg-[#FAFBFC] rounded-[8px] cursor-pointer transition-colors"
          >
            {/* Inter Regular 14px, #14171C */}
            <span className="text-[14px] font-normal text-[#14171C]">
              {doc.title}
            </span>

            {/* Desktop: "Открыть →" (#0D8C47) */}
            <span className="hidden lg:flex text-[14px] font-semibold text-[#0D8C47] items-center gap-1">
              Открыть →
            </span>

            {/* Mobile: "›" (#8C9199) */}
            <span className="lg:hidden text-[#8C9199] text-xl font-light">
              ›
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
