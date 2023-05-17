import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Header from "@/components/Header";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();
  if (!user) return notFound();

  return (
    <div>
      <Header name={user.name as string} image={user.image as string} />
      {children}
    </div>
  );
}
