import { z } from "zod";

export const ErrorSchema = z.object({
  success: z.boolean(),

  message: z.string(),

  errors: z
    .array(
      z.object({
        field: z.string(),

        message: z.string(),
      }),
    )
    .optional(),
});