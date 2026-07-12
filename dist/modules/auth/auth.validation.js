"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.refreshSchema = exports.loginSchema = exports.verifyOtpSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "الاسم مطلوب"),
    email: zod_1.z.string().email("البريد الإلكتروني غير صحيح").optional(),
    phone: zod_1.z.string().min(10, "رقم الهاتف مطلوب"),
    password: zod_1.z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    role: zod_1.z.enum(["customer", "driver", "restaurant", "admin"]),
});
exports.verifyOtpSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1, "المعرف مطلوب"),
    otp: zod_1.z.string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
});
exports.loginSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1, "البريد أو الهاتف مطلوب"),
    password: zod_1.z.string().min(1, "كلمة المرور مطلوبة"),
});
exports.refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "توكن التحديث مطلوب"),
});
exports.forgotPasswordSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1, "البريد أو الهاتف مطلوب"),
});
exports.resetPasswordSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1, "البريد أو الهاتف مطلوب"),
    otp: zod_1.z.string().length(6, "رمز التحقق غير صحيح"),
    newPassword: zod_1.z.string().min(6, "كلمة المرور قصيرة"),
});
//# sourceMappingURL=auth.validation.js.map