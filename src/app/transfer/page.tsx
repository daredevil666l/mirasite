import { Metadata } from "next";
import { Suspense } from "react";
import { TransferWizard } from "@/components/features/transfer/TransferWizard";

export const metadata: Metadata = {
  title: "Оформление перевода — MiraMoney",
  description: "Быстрый денежный перевод за рубеж с выгодным курсом и комиссией 0 ₽.",
};

export default function TransferPage() {
  return (
    <div className="min-h-screen w-full bg-[#F7FAFC] flex items-center justify-center p-0 sm:p-6 lg:p-10 font-sans antialiased">
      <Suspense fallback={<div className="text-[#8C9199] text-[14px]">Загрузка формы перевода...</div>}>
        <TransferWizard isModal={false} />
      </Suspense>
    </div>
  );
}

