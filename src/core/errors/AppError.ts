import { FieldError } from "../../shared/types";

class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: FieldError[];

  constructor(
    message: string,
    statusCode: number,
    errors: FieldError[] = [],
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;