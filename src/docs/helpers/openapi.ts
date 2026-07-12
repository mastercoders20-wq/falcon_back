import { z } from "zod";
import { ResponseConfig } from "@asteasolutions/zod-to-openapi";

export const body = (schema: z.ZodTypeAny) => ({
  body: {
    required: true,
    content: {
      "application/json": {
        schema,
      },
    },
  },
});

export const response = (
  status: string,
  description: string,
  example?: unknown,
  schema?: z.ZodTypeAny,
): Record<string, ResponseConfig> => {
  const media: any = {};

  if (schema) {
    media.schema = schema;
  }

  if (example !== undefined) {
    media.example = example;
  }

  return {
    [status]: {
      description,
      content: {
        "application/json": media,
      },
    },
  };
};