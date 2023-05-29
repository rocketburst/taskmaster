"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import ModalProvider from "@/contexts/ModalContext";
import TaskProvider from "@/contexts/TaskContext";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <TaskProvider>
        <ModalProvider>
          <Toaster />
          {children}
        </ModalProvider>
      </TaskProvider>
    </SessionProvider>
  );
}
