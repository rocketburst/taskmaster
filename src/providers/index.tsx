"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import ModalProvider from "@/contexts/ModalContext";
import TaskProvider from "@/contexts/TaskContext";
import SummaryProvider from "@/contexts/SummaryContext";
import Modals from "@/components/modals";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <TaskProvider>
        <ModalProvider>
          <SummaryProvider>
            <Toaster />
            <Modals />

            {children}
          </SummaryProvider>
        </ModalProvider>
      </TaskProvider>
    </SessionProvider>
  );
}
