"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

export type DashboardTab =
  | "profile"
  | "history"
  | "verification"
  | "limits"
  | "security"
  | "settings"
  | "documents"
  | "support";

interface ProfileSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  userName?: string;
  userPhone?: string;
}

export const NAV_ITEMS = [
  { id: "profile", label: "Профиль" },
  { id: "history", label: "История переводов" },
  { id: "verification", label: "Верификация" },
  { id: "limits", label: "Лимиты" },
  { id: "security", label: "Безопасность" },
  { id: "settings", label: "Настройки" },
  { id: "documents", label: "Документы" },
  { id: "support", label: "Поддержка" },
] as const;

/**
 * Сайдбар Личного кабинета — 100% Pixel-Perfect по ноде Figma #5:3 (Desktop 1440)
 */
export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  onSelectTab,
  userName = "Иван Иванов",
  userPhone = "+7 900 xxx-xx-89",
}) => {
  return (
    <aside className="w-[280px] min-w-[280px] bg-white border-r border-[#E5E8ED] min-h-screen py-8 px-6 flex flex-col gap-6 flex-shrink-0">
      {/* Логотип MiraMoney (#41:3806 / #59:2: 94x36px) */}
      <Link href="/" className="relative w-[94px] h-[36px] flex items-center">
        <Image
          src={getAssetPath("/images/logo.png")}
          alt="MiraMoney"
          fill
          priority
          className="object-contain object-left"
        />
      </Link>

      {/* UserCard (#5:6: Avatar 40x40px, Name, Phone) */}
      <div className="flex items-center gap-3 pt-2">
        {/* Avatar (#5:8: 40x40px, bg #D9DEE5, borderRadius 20px) */}
        <div className="w-10 h-10 rounded-full bg-[#D9DEE5] text-[#14171C] font-semibold text-[14px] flex items-center justify-center flex-shrink-0 select-none">
          И
        </div>
        <div className="flex flex-col">
          {/* #5:10: Inter SemiBold 14px, #14171C */}
          <span className="text-[14px] font-semibold text-[#14171C]">
            {userName}
          </span>
          {/* #5:11: Inter Regular 12px, #8C9199 */}
          <span className="text-[12px] font-normal text-[#8C9199]">
            {userPhone}
          </span>
        </div>
      </div>

      {/* Nav (#5:7: gap 4px) */}
      <nav className="flex flex-col gap-1 pt-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id as DashboardTab)}
              className={`w-full h-[40px] px-3.5 rounded-[8px] flex items-center gap-3 text-[14px] transition-all text-left ${
                isActive
                  ? "bg-[#E3F7EB] text-[#0D8C47] font-semibold"
                  : "text-[#40454D] font-normal hover:bg-[#F7FAFC] hover:text-[#14171C]"
              }`}
            >
              {/* icon (#8:20 / #8:21: 16x16px square radius 4px) */}
              <div
                className={`w-4 h-4 rounded-[4px] flex-shrink-0 ${
                  isActive ? "bg-[#0D8C47]" : "bg-[#BFC4CC]"
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
