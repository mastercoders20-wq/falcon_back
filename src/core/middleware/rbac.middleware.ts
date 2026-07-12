import { Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { UserRole } from "../../shared/types";
import { AuthRequest } from "../../shared/types/auth-request.type";

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new AppError("غير مصرح", 401));
      }

      if (!roles.includes(user.role)) {
        return next(new AppError("ليس لديك صلاحية", 403));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
