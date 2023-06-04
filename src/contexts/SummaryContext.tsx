import { type MouseEvent, createContext, useContext } from "react";
import { toast } from "react-hot-toast";

import { AIInputSchema, type OpenAIResponse } from "@/lib/validators";
import { ModalContext } from "./ModalContext";
import type { ModalContextType, SummaryContextType } from "@/types";

export const SummaryContext = createContext<SummaryContextType | null>(null);

export default function SummaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;

  const createTaskSummary = async () => {
    const { inputString } = await fetch("/api/ai-input")
      .then(res => res.json())
      .then(json => AIInputSchema.parse(json));

    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ inputString }),
    });
    const { summaryObject }: { summaryObject: OpenAIResponse } =
      await res.json();

    localStorage.setItem("summary", summaryObject.choices[0].text);

    return summaryObject;
  };

  const handleSummarizeAction = async (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const id = toast.loading("Getting Summary");

    await createTaskSummary().then(() => {
      toast.success("Summarization Successful!", { id });
      changeModalVisibility("summary");
    });
  };

  return (
    <SummaryContext.Provider
      value={{ createTaskSummary, handleSummarizeAction }}
    >
      {children}
    </SummaryContext.Provider>
  );
}
