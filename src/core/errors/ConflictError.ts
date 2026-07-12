import { FieldError } from "../../shared/types";
import AppError from "./AppError";

class ConflictError extends AppError {
  constructor(
    message = "Conflict Error",
    errors: FieldError[] = [],
  ) {
    super(message, 409, errors);
  }
}

export default ConflictError;