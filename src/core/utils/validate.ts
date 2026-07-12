import { ZodError, ZodSchema } from "zod";
import AppError from "../errors/AppError";

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  console.log("VALIDATE START");
  try {
    return schema.parse(data);
  } catch (err) {
    console.log("VALIDATE ERROR");
    if (err instanceof ZodError) {
      throw new AppError(
        "خطأ في التحقق من البيانات",
        400,
        err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      );
    }

    throw err;
  }
}
