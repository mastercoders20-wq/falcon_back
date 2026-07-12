import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),

  email: z.string().email("البريد الإلكتروني غير صحيح").optional(),

  phone: z.string().min(10, "رقم الهاتف مطلوب"),

  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),

  role: z.enum(["customer", "driver", "restaurant", "admin"]),
});

export const verifyOtpSchema = z.object({
  identifier: z.string().min(1, "المعرف مطلوب"),
  otp: z.string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "البريد أو الهاتف مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, "توكن التحديث مطلوب"),
});

export const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, "البريد أو الهاتف مطلوب"),
});

export const resetPasswordSchema = z.object({
  identifier: z.string().min(1, "البريد أو الهاتف مطلوب"),
  otp: z.string().length(6, "رمز التحقق غير صحيح"),
  newPassword: z.string().min(6, "كلمة المرور قصيرة"),
});
