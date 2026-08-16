"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg";
}

/**
 * Универсальное модальное окно с оверлеем и блокировкой прокрутки фона
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = "md",
}) => {
  // Блокировка скролла страницы при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-[380px]",
    md: "max-w-[440px]",
    lg: "max-w-[560px]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Затемненный фон (Scrim #107:209: rgba(10, 15, 23, 0.45)) */}
      <div
        className="fixed inset-0 bg-[#0A0F17]/50 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Контейнер модального окна (#107:210: borderRadius 20px, bg #FFFFFF) */}
      <div
        className={cn(
          "relative w-full bg-white rounded-modal shadow-modal p-6 md:p-7 z-10 transition-all transform animate-in zoom-in-95 duration-200",
          maxWidthStyles[maxWidth],
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Хедер модального окна */}
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h3 className="text-xl font-bold text-mira-dark-900 tracking-tight">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-mira-gray-200 text-mira-gray-900 hover:bg-mira-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-mira-green"
            aria-label="Закрыть окно"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Тело модального окна */}
        <div>{children}</div>
      </div>
    </div>
  );
};
