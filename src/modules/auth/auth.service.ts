import bcrypt from "bcryptjs";
import { redis } from "../../libs/redis";
import { JwtService } from "../../libs/jwt";
import { UserRepository } from "../user/user.repository";
import AppError from "../../core/errors/AppError";

import {
  registerSchema,
  verifyOtpSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.validation";

import { validate } from "../../core/utils/validate";

export class AuthService {
  static async register(data: any) {
    console.log("5- ENTER SERVICE");

    const input = validate(registerSchema, data);
    console.log("6- AFTER VALIDATE");
    const exists = await UserRepository.findByEmailOrPhone(
      input.email,
      input.phone,
    );

    if (exists) {
      throw new AppError("المستخدم موجود مسبقاً", 409, [
        { field: "email/phone", message: "هذا الحساب مستخدم" },
      ]);
    }

    const hashed = await bcrypt.hash(input.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const identifier = input.email || input.phone;

    await redis.set(
      `otp:${identifier}`,
      JSON.stringify({
        otp,
        user: { ...input, password: hashed },
      }),
      "EX",
      600,
    );

    console.log("OTP:", otp);

    return { message: "تم إرسال رمز التحقق", otp };
  }

  static async verifyOtp(identifier: string, otp: string) {
    const input = validate(verifyOtpSchema, { identifier, otp });

    const attemptsKey = `otp:attempts:${input.identifier}`;

    const attempts = await redis.get(attemptsKey);

    if (attempts && parseInt(attempts) >= 5) {
      throw new AppError(
        "تم قفل المحاولة مؤقتاً بسبب محاولات خاطئة كثيرة",
        429,
      );
    }

    const data = await redis.get(`otp:${input.identifier}`);

    if (!data) {
      throw new AppError("انتهت صلاحية رمز التحقق", 400);
    }

    const parsed = JSON.parse(data);

    if (parsed.otp !== input.otp) {
      await redis.incr(attemptsKey);
      await redis.expire(attemptsKey, 600);
      throw new AppError("رمز التحقق غير صحيح", 400);
    }

    await redis.del(attemptsKey);

    const user = await UserRepository.create(parsed.user);

    await redis.del(`otp:${input.identifier}`);

    const accessToken = JwtService.signAccess({
      id: user._id,
      role: user.role,
    });

    const refreshToken = JwtService.signRefresh({
      id: user._id,
    });

    await redis.set(
      `session:${user._id}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60,
    );

    return { user, accessToken, refreshToken };
  }

  static async login(identifier: string, password: string) {
    const input = validate(loginSchema, { identifier, password });

    const user = await UserRepository.findByEmailOrPhone(
      input.identifier,
      input.identifier,
    );

    if (!user) {
      throw new AppError("المستخدم غير موجود", 404);
    }

    const match = await bcrypt.compare(input.password, user.password);

    if (!match) {
      throw new AppError("كلمة المرور غير صحيحة", 401);
    }

    const accessToken = JwtService.signAccess({
      id: user._id,
      role: user.role,
    });

    const refreshToken = JwtService.signRefresh({
      id: user._id,
    });

    await redis.set(
      `session:${user._id}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60,
    );

    return { user, accessToken, refreshToken };
  }

  static async refresh(refreshToken: string) {
    const input = validate(refreshSchema, { refreshToken });

    const decoded: any = JwtService.verifyRefresh(input.refreshToken);

    const stored = await redis.get(`session:${decoded.id}`);

    if (!stored || stored !== input.refreshToken) {
      throw new AppError("جلسة غير صالحة", 401);
    }

    const newAccess = JwtService.signAccess({
      id: decoded.id,
    });

    const newRefresh = JwtService.signRefresh({
      id: decoded.id,
    });

    await redis.set(
      `session:${decoded.id}`,
      newRefresh,
      "EX",
      7 * 24 * 60 * 60,
    );

    return { accessToken: newAccess, refreshToken: newRefresh };
  }

  static async logout(userId: string) {
    await redis.del(`session:${userId}`);
    return { message: "تم تسجيل الخروج" };
  }

  static async forgotPassword(identifier: string) {
    const input = validate(forgotPasswordSchema, { identifier });

    const user = await UserRepository.findByEmailOrPhone(
      input.identifier,
      input.identifier,
    );

    if (!user) {
      throw new AppError("المستخدم غير موجود", 404);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.set(
      `forgot:${input.identifier}`,
      JSON.stringify({
        otp,
        userId: user._id,
      }),
      "EX",
      600,
    );

    console.log("FORGOT OTP:", otp);

    return { message: "تم إرسال رمز إعادة التعيين", otp };
  }

  static async resetPassword(
    identifier: string,
    otp: string,
    newPassword: string,
  ) {
    const input = validate(resetPasswordSchema, {
      identifier,
      otp,
      newPassword,
    });

    const data = await redis.get(`forgot:${input.identifier}`);

    if (!data) {
      throw new AppError("انتهت صلاحية الرمز", 400);
    }

    const parsed = JSON.parse(data);

    if (parsed.otp !== input.otp) {
      throw new AppError("رمز غير صحيح", 400);
    }

    const hashed = await bcrypt.hash(input.newPassword, 10);

    await UserRepository.updatePassword(parsed.userId, hashed);

    await redis.del(`forgot:${input.identifier}`);

    return { message: "تم تغيير كلمة المرور بنجاح" };
  }

  static async resendOtp(identifier: string) {
    const cooldownKey = `otp:cooldown:${identifier}`;
    const attemptsKey = `otp:resend:count:${identifier}`;

    const cooldown = await redis.get(cooldownKey);

    if (cooldown) {
      throw new AppError("يرجى الانتظار قبل إعادة إرسال الرمز", 429);
    }

    const attempts = await redis.get(attemptsKey);

    if (attempts && parseInt(attempts) >= 5) {
      throw new AppError("تم تجاوز عدد المحاولات المسموحة", 429);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.set(`otp:${identifier}`, JSON.stringify({ otp }), "EX", 600);

    await redis.incr(attemptsKey);
    await redis.expire(attemptsKey, 600);

    await redis.set(cooldownKey, "1", "EX", 60);

    console.log("RESEND OTP:", otp);

    return { message: "تم إرسال رمز جديد", otp };
  }
}
