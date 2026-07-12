import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      throw new AppError("غير مصرح بالدخول", 401);
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AppError("غير مصرح لك بهذه العملية", 403);
    }

    next();
  };
};