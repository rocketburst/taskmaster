import { Inter } from "next/font/google";
import clsx from "clsx";

import type { LayoutProps } from "@/types";
import "./globals.css";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Taskmaster",
  description: "A minimal all-in-one task manager that suits your needs.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-gray-50")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
