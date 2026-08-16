import { Metadata } from "next";
import { DashboardLayout } from "@/components/features/profile/DashboardLayout";

export const metadata: Metadata = {
  title: "Профиль пользователя — MiraMoney",
  description: "Личный кабинет пользователя MiraMoney.",
};

export default function ProfilePage() {
  return <DashboardLayout initialTab="profile" />;
}
