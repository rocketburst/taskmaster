"use client";

import { useContext } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import type { ModalContextType } from "@/types";
import BaseModal from "./BaseModal";

export default function SummaryModal() {
  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;

  return (
    <BaseModal type="summary" title="Today's Summary">
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {localStorage.getItem("summary")}
        </p>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={() => changeModalVisibility("summary")}
        >
          Got it, thanks!
        </button>
      </div>
    </BaseModal>
  );
}
