import { Metadata } from "next";
import { TransferWizard } from "@/components/features/transfer/TransferWizard";

export const metadata: Metadata = {
  title: "Оформление перевода — MiraMoney",
  description: "Быстрый денежный перевод за рубеж с выгодным курсом и комиссией 0 ₽.",
};

export default function TransferPage() {
  return (
    <div className="min-h-screen w-full bg-[#F7FAFC] flex items-center justify-center p-0 sm:p-6 lg:p-10 font-sans antialiased">
      <TransferWizard isModal={false} />
    </div>
  );
}
