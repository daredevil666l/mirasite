import { Metadata } from "next";
import { RegistrationWizard } from "@/components/features/auth/RegistrationWizard";

export const metadata: Metadata = {
  title: "Регистрация и вход — MiraMoney",
  description: "Создайте аккаунт в сервисе денежных переводов MiraMoney за 1 минуту.",
};

export default function RegisterPage() {
  return <RegistrationWizard />;
}
