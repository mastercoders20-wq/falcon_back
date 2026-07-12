import { Response, NextFunction } from "express";
import { JwtService } from "../../libs/jwt";
import AppError from "../errors/AppError";
import { UserRepository } from "../../modules/user/user.repository";
import { AuthRequest } from "../../shared/types/auth-request.type";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new AppError("غير مصرح بالدخول", 401);
    }

    const decoded = JwtService.verifyAccess(token) as {
      id: string;
      role: string;
    };

    const user = await UserRepository.findById(decoded.id);

    if (!user) {
      throw new AppError("المستخدم غير موجود", 401);
    }

    if (!user.isVerified) {
      throw new AppError("الحساب غير مفعل", 403);
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};