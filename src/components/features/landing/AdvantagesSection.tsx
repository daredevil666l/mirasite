import React from "react";
import { TrendingUp, ShieldCheck, Zap, Lock } from "lucide-react";

/**
 * Секция "Преимущества MiraMoney" — 100% точное соответствие Figma 8:554 (Desktop) и 13:1216 (Mobile)
 */
export const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      id: "rate",
      title: "Выгодный курс",
      desc: "Курс обновляется в реальном времени и всегда ближе к межбанковскому",
      icon: TrendingUp,
    },
    {
      id: "experience",
      title: "Наш опыт",
      desc: "Тысячи успешных переводов и стабильно растущий курс доверия клиентов",
      icon: ShieldCheck,
    },
    {
      id: "instant",
      title: "Мгновенное зачисление",
      desc: "Получатель видит деньги на счету в течение нескольких минут",
      icon: Zap,
    },
    {
      id: "safety",
      title: "Гарантия безопасности транзакций",
      desc: "Шифрование данных на всех этапах перевода, соответствие требованиям 152-ФЗ",
      icon: Lock,
    },
  ];

  return (
    <section id="advantages" className="w-full bg-white py-10 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 flex flex-col items-start lg:items-center gap-6 lg:gap-10">
        {/* Заголовок (#8:555 / #13:1217: Desktop центрирован 32px Bold, Mobile по левому краю 24px Bold) */}
        <h2 className="text-[24px] lg:text-[32px] font-bold text-[#14171C] text-left lg:text-center tracking-tight w-full">
          <span className="lg:inline hidden">Преимущества MiraMoney</span>
          <span className="lg:hidden inline">Преимущества Miramoney</span>
        </h2>

        {/* Сетка карточек (#8:556 Desktop 2x2 с иконками, #13:1216 Mobile стек без иконок) */}
        <div className="w-full max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {advantages.map((adv) => {
            const IconComponent = adv.icon;
            return (
              <div
                key={adv.id}
                className="w-full bg-white rounded-[16px] lg:rounded-[20px] p-5 lg:p-[28px] border border-[#EBEDF0] flex flex-col gap-2 lg:gap-2.5 shadow-[0px_2px_8px_rgba(0,0,0,0.02)]"
              >
                {/* Иконка: только на Desktop (#22:1591, 48x48px #E3F7EB, на mobile в Figma иконок нет!) */}
                <div className="hidden lg:flex w-12 h-12 rounded-[14px] bg-[#E3F7EB] items-center justify-center mb-1">
                  <IconComponent className="w-6 h-6 text-[#0D8C47]" />
                </div>

                {/* Заголовок (#22:1595 / #13:1222: Desktop 20px Bold, Mobile 18px Bold) */}
                <h3 className="text-[18px] lg:text-[20px] font-bold text-[#14171C]">
                  {adv.title}
                </h3>

                {/* Описание (#22:1596 / #13:1223: Desktop 14px Regular, Mobile 13px Regular #666B73) */}
                <p className="text-[13px] lg:text-[14px] text-[#666B73] leading-[1.4] max-w-[400px]">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
