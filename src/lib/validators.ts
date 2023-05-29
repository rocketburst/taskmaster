import { z } from "zod";

export const AIInputSchema = z.object({
  inputString: z.string().min(1),
});
