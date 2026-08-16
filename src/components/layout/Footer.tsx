import React from "react";
import Link from "next/link";

/**
 * Футер сайта — 100% точное соответствие Figma нодам 11:643 (Desktop 1440px) и 20:1290 (Mobile 375px)
 */
export const Footer: React.FC = () => {
  const links = [
    { label: "О компании", href: "#about" },
    { label: "Тарифы", href: "#advantages" },
    { label: "Поддержка", href: "#faq" },
    { label: "Документы", href: "#documents" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <footer className="w-full bg-[#171F26] text-white">
      {/* ================= DESKTOP FOOTER (#11:643: 1440x220, padding: 56px 80px 40px, gap: 32px) ================= */}
      <div className="hidden lg:flex max-w-[1440px] mx-auto px-20 py-[56px] pb-[40px] flex-col gap-[32px]">
        {/* FooterTop (#11:644: max-w 1280px, h 80px, padding 10px, justify-between) */}
        <div className="w-full max-w-[1280px] h-[80px] p-[10px] flex items-center justify-between">
          {/* FooterLinks (#11:646: w 600px, h 33px, p 10px, gap 40px, mode: row) */}
          <div className="flex items-center gap-[40px]">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-medium text-[#CCD1D9] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright (#11:654: Inter Regular 13px, #80878F) */}
        <p className="text-[13px] font-normal text-[#80878F]">
          © 2026 MiraMoney. Все права защищены. ООО «МираМани», ИНН 0000000000
        </p>
      </div>

      {/* ================= MOBILE FOOTER (#20:1290: 375px, padding: 40px 20px 32px, gap: 20px) ================= */}
      <div className="lg:hidden w-full max-w-[375px] mx-auto px-5 py-[40px] pb-[32px] flex flex-col gap-[20px]">
        {/* #20:1291: Inter Bold 19px, #26D980 */}
        <span className="text-[19px] font-bold text-[#26D980]">
          MiraMoney
        </span>

        {/* #20:1292: Inter Regular 13px, #99A1A8 */}
        <span className="text-[13px] font-normal text-[#99A1A8] -mt-2">
          Международные переводы онлайн
        </span>

        {/* FooterLinks (#20:1293: padding 10px, gap 12px, column) */}
        <div className="flex flex-col gap-[12px] p-[10px] pl-0">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-[#CCD1D9] hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright (#20:1299: Inter Regular 12px, #80878F) */}
        <p className="text-[12px] font-normal text-[#80878F] pt-2">
          © 2026 MiraMoney. Все права защищены.
        </p>
      </div>
    </footer>
  );
};
