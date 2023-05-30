import { type MouseEvent, createContext } from "react";

import { AIInputSchema, OpenAIResponse } from "@/lib/validators";
import type { SummaryContextType } from "@/types";

export const SummaryContext = createContext<SummaryContextType | null>(null);

export default function SummaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

    await createTaskSummary();
  };

  return (
    <SummaryContext.Provider
      value={{ createTaskSummary, handleSummarizeAction }}
    >
      {children}
    </SummaryContext.Provider>
  );
}
