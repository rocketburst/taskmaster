"use client";

import { createContext, useState } from "react";

import type { ModalContextType, ModalType } from "@/types";

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const changeModalVisibility = (modal: ModalType) => {
    switch (modal) {
      case "create":
        setIsCreateModalOpen(!isCreateModalOpen);
        break;
      case "edit":
        setIsEditModalOpen(!isEditModalOpen);
        break;
      case "sort":
        setIsSortModalOpen(!isSortModalOpen);
        break;
    }
  };

  const getModalState = (modal: ModalType) => {
    switch (modal) {
      case "create":
        return isCreateModalOpen;
      case "edit":
        return isEditModalOpen;
      case "sort":
        return isSortModalOpen;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        changeModalVisibility,
        getModalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
