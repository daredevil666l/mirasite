import { Metadata } from "next";
import { DashboardLayout } from "@/components/features/profile/DashboardLayout";

export const metadata: Metadata = {
  title: "Личный кабинет — MiraMoney",
  description: "Управление профилем, история денежных переводов, лимиты и верификация.",
};

export default function DashboardPage() {
  return <DashboardLayout initialTab="profile" />;
}
