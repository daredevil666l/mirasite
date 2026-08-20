"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProfileSidebar, DashboardTab } from "./ProfileSidebar";
import { ProfileTab } from "./ProfileTab";
import { HistoryTab } from "./HistoryTab";
import { VerificationTab } from "./VerificationTab";
import { LimitsTab } from "./LimitsTab";
import { SecurityTab } from "./SecurityTab";
import { SettingsTab } from "./SettingsTab";
import { DocumentsTab } from "./DocumentsTab";

interface DashboardLayoutProps {
  initialTab?: DashboardTab;
}

/**
 * Главный контейнер Личного кабинета:
 * - Desktop (#5:2 - #8:458: 1440px)
 * - Mobile (#20:1300 - #22:1555: 375px, max-w-[375px])
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  initialTab = "profile",
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

  const handleBackToProfile = () => {
    setActiveTab("profile");
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] font-sans antialiased flex flex-col lg:flex-row">
      {/* Desktop Sidebar (#5:3: 280px, bg #FFFFFF, border-r 1px solid #E5E8ED) */}
      <div className="hidden lg:block">
        <ProfileSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />
      </div>

      {/* Main Content Area (#5:4 Desktop / #20:1301 Mobile) */}
      <main className="flex-1 w-full max-w-[375px] sm:max-w-[480px] lg:max-w-[1440px] mx-auto px-5 py-6 sm:p-6 lg:p-12 min-w-0 pb-28 lg:pb-12 overflow-y-auto">
        {activeTab === "profile" && (
          <ProfileTab onNavigateToTab={(t) => setActiveTab(t as DashboardTab)} />
        )}
        {activeTab === "history" && (
          <HistoryTab onBack={handleBackToProfile} />
        )}
        {activeTab === "verification" && (
          <VerificationTab onBack={handleBackToProfile} />
        )}
        {activeTab === "limits" && (
          <LimitsTab onBack={handleBackToProfile} />
        )}
        {activeTab === "security" && (
          <SecurityTab
            onNavigateToTab={(t) => setActiveTab(t as DashboardTab)}
            onBack={handleBackToProfile}
          />
        )}
        {activeTab === "settings" && (
          <SettingsTab onBack={handleBackToProfile} />
        )}
        {activeTab === "documents" && (
          <DocumentsTab onBack={handleBackToProfile} />
        )}
        {activeTab === "support" && (
          <div className="flex flex-col gap-5 lg:gap-6 w-full max-w-[1064px]">
            {/* Кнопка возврата в ЛК для мобильной версии */}
            <button
              type="button"
              onClick={handleBackToProfile}
              className="lg:hidden flex items-center gap-1.5 text-[14px] font-semibold text-[#0D8C47] hover:underline self-start cursor-pointer -mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад в профиль</span>
            </button>

            <h1 className="text-[24px] lg:text-[28px] font-bold text-[#14171C]">
              Поддержка
            </h1>
            <div className="bg-white rounded-[14px] lg:rounded-[12px] p-5 lg:p-6 flex flex-col gap-4 border border-[#E5E8ED]">
              <p className="text-[14px] text-[#40454D] leading-relaxed">
                Служба заботы о клиентах MiraMoney работает круглосуточно.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="h-[44px] px-5 rounded-[10px] lg:rounded-[8px] bg-[#0D8C47] hover:bg-[#0D6638] text-white text-[14px] font-semibold flex items-center justify-center transition-colors shadow-xs"
                >
                  Написать в Telegram
                </a>
                <a
                  href="tel:+78005553535"
                  className="h-[44px] px-5 rounded-[10px] lg:rounded-[8px] bg-[#F2F5F7] hover:bg-[#E5E8ED] text-[#14171C] text-[14px] font-semibold flex items-center justify-center transition-colors"
                >
                  8 (800) 555-35-35
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom TabBar (#22:1331: TabHome, TabHistory, TabLimits, TabSupport) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[#E5E8ED] flex items-center justify-around px-4 z-40">
        {[
          { id: "profile", label: "Главная" },
          { id: "history", label: "История" },
          { id: "limits", label: "Лимиты" },
          { id: "support", label: "Поддержка" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as DashboardTab)}
              className="flex flex-col items-center justify-center gap-1 w-[60px] h-[44px] outline-none focus:outline-none select-none transition-colors"
            >
              {/* square icon (#22:1336 / #22:1338: 16x16px square radius 4px) */}
              <div
                className={`w-4 h-4 rounded-[4px] flex-shrink-0 transition-colors ${
                  isActive ? "bg-[#0D8C47]" : "bg-[#BFC4CC]"
                }`}
              />
              <span
                className={`text-[11px] leading-none transition-colors ${
                  isActive
                    ? "font-semibold text-[#0D8C47]"
                    : "font-normal text-[#8C9199]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
