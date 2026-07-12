import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("🔥 ERROR MIDDLEWARE CALLED");
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values((err as any).errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];

    return res.status(409).json({
      success: false,
      message: "Duplicate field",
      errors: [
        {
          field,
          message: `${field} already exists`,
        },
      ],
    });
  }

  console.error("🔥 Unexpected Error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
};
