import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import type { LayoutProps } from "@/types";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default async function DashboardLayout({ children }: LayoutProps) {
  const user = await getCurrentUser();
  if (!user) return notFound();

  return (
    <div>
      <Header name={user.name as string} image={user.image as string} />
      {children}
      <Footer />
    </div>
  );
}
