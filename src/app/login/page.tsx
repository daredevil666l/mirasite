import { Metadata } from "next";
import { Suspense } from "react";
import { RegistrationWizard } from "@/components/features/auth/RegistrationWizard";

export const metadata: Metadata = {
  title: "Вход в личный кабинет — MiraMoney",
  description: "Войдите в личный кабинет MiraMoney по номеру телефона за 1 минуту.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center text-[#8C9199] text-[14px]">Загрузка...</div>}>
      <RegistrationWizard initialMode="login" />
    </Suspense>
  );
}
