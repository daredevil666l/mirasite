"use client";

import React, { useEffect } from "react";
import { NAV_LINKS } from "@/data/mockData";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTransfer?: () => void;
}

/**
 * Мобильное выезжающее меню
 */
export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onStartTransfer,
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-[300px] w-full bg-white p-6 flex flex-col justify-between z-10 shadow-2xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDF0F2]">
            <div className="relative w-[94px] h-[36px]">
              <Image
                src={getAssetPath("/images/logo.png")}
                alt="MiraMoney"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F2F5F7] flex items-center justify-center text-[#14171C]"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg text-[15px] font-medium text-[#40454D] hover:bg-[#F2F5F7] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#8C9199]" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#EDF0F2] flex flex-col gap-3">
          <Link
            href="/login"
            onClick={onClose}
            className="w-full h-11 rounded-lg border border-[#CCD1D9] text-[#14171C] font-semibold text-[14px] flex items-center justify-center transition-colors hover:bg-[#F2F5F7]"
          >
            Войти
          </Link>
          <button
            onClick={() => {
              onClose();
              if (onStartTransfer) onStartTransfer();
            }}
            className="w-full h-11 rounded-lg bg-[#0D8C47] text-white font-semibold text-[14px] flex items-center justify-center transition-colors hover:bg-[#0D6638]"
          >
            Начать перевод
          </button>
        </div>
      </div>
    </div>
  );
};
