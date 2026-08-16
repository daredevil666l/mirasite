import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiraMoney — Быстрые и надёжные денежные переводы за рубеж",
  description: "Отправляйте денежные переводы за рубеж (Узбекистан, Китай, Беларусь, Таджикистан, Кыргызстан) по номеру телефона или карты с выгодным курсом и комиссией 0 ₽.",
  keywords: "денежные переводы, переводы в узбекистан, переводы в китай, переводы онлайн, miramoney, трансгран",
  openGraph: {
    title: "MiraMoney — Международные денежные переводы",
    description: "Быстрые и надёжные переводы за рубеж с выгодным курсом и без скрытых комиссий.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#14171C] font-sans antialiased selection:bg-[#E3F7EB] selection:text-[#0A4024]">
        {children}
      </body>
    </html>
  );
}
