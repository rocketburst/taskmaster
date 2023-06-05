"use client";

import { useContext, useEffect, useState } from "react";

import { ModalContext } from "@/contexts/ModalContext";
import type { ModalContextType } from "@/types";
import BaseModal from "./BaseModal";

export default function SummaryModal() {
  const { changeModalVisibility, getModalState } = useContext(
    ModalContext
  ) as ModalContextType;
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("summary"))
      setSummary(localStorage.getItem("summary"));
  }, [getModalState("summary")]);

  return (
    <BaseModal type="summary" title="Today's Summary">
      <div className="mt-2 space-y-3">
        <p className="text-sm text-gray-500">{summary}</p>

        <p className="text-xs text-gray-500">
          *This route is rate limited to prevent spam
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
