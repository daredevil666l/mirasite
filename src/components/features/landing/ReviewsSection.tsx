import React from "react";

/**
 * Секция "Отзывы наших клиентов" — 100% точное соответствие Figma 11:631 (Desktop) и 20:1279 (Mobile)
 */
export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: "rev-1",
      author: "Марат Т.",
      text: "«Перевёл маме в Баку за 5 минут, курс оказался выгоднее, чем в банке»",
    },
    {
      id: "rev-2",
      author: "Динара С.",
      text: "«Удобное приложение, поддержка отвечает быстро, всё прозрачно»",
    },
    {
      id: "rev-3",
      author: "Бахтиёр А.",
      text: "«Пользуюсь каждый месяц для переводов в Ташкент, ни разу проблем не было»",
    },
  ];

  return (
    <section className="w-full bg-white py-10 lg:py-[70px]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 flex flex-col items-start lg:items-center gap-6 lg:gap-[40px]">
        {/* Заголовок (#11:632 / #20:1280: Desktop центрирован 32px, Mobile по левому краю 22px) */}
        <h2 className="text-[22px] lg:text-[32px] font-bold text-[#14171C] text-left lg:text-center tracking-tight w-full">
          Отзывы наших клиентов
        </h2>

        {/* ReviewsRow (#11:633 Desktop row 1280px gap 24px, #20:1279 Mobile column max-w 335px gap 14px) */}
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-center justify-center gap-3.5 lg:gap-[24px]">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="w-full max-w-[335px] md:max-w-[410px] min-h-[120px] lg:h-[170px] bg-[#F7FAFC] rounded-[14px] lg:rounded-[16px] p-4 lg:p-[24px] flex flex-col gap-2 lg:gap-[12px] flex-shrink-0"
            >
              {/* Автор (#11:637 / #20:1284: Inter Bold 15px Desktop / 14px Mobile, #14171C) */}
              <h3 className="text-[14px] lg:text-[15px] font-bold text-[#14171C]">
                {rev.author}
              </h3>

              {/* Текст отзыва (#11:638 / #20:1285: Inter Regular 14px Desktop / 13px Mobile, #666B73) */}
              <p className="text-[13px] lg:text-[14px] text-[#666B73] leading-[1.45] max-w-[360px]">
                {rev.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
