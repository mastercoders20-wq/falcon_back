"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redis_1 = require("../../libs/redis");
const jwt_1 = require("../../libs/jwt");
const user_repository_1 = require("../user/user.repository");
const AppError_1 = __importDefault(require("../../core/errors/AppError"));
const auth_validation_1 = require("./auth.validation");
const validate_1 = require("../../core/utils/validate");
class AuthService {
    static async register(data) {
        console.log("5- ENTER SERVICE");
        const input = (0, validate_1.validate)(auth_validation_1.registerSchema, data);
        console.log("6- AFTER VALIDATE");
        const exists = await user_repository_1.UserRepository.findByEmailOrPhone(input.email, input.phone);
        if (exists) {
            throw new AppError_1.default("المستخدم موجود مسبقاً", 409, [
                { field: "email/phone", message: "هذا الحساب مستخدم" },
            ]);
        }
        const hashed = await bcryptjs_1.default.hash(input.password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const identifier = input.email || input.phone;
        await redis_1.redis.set(`otp:${identifier}`, JSON.stringify({
            otp,
            user: { ...input, password: hashed },
        }), "EX", 600);
        console.log("OTP:", otp);
        return { message: "تم إرسال رمز التحقق", otp };
    }
    static async verifyOtp(identifier, otp) {
        const input = (0, validate_1.validate)(auth_validation_1.verifyOtpSchema, { identifier, otp });
        const attemptsKey = `otp:attempts:${input.identifier}`;
        const attempts = await redis_1.redis.get(attemptsKey);
        if (attempts && parseInt(attempts) >= 5) {
            throw new AppError_1.default("تم قفل المحاولة مؤقتاً بسبب محاولات خاطئة كثيرة", 429);
        }
        const data = await redis_1.redis.get(`otp:${input.identifier}`);
        if (!data) {
            throw new AppError_1.default("انتهت صلاحية رمز التحقق", 400);
        }
        const parsed = JSON.parse(data);
        if (parsed.otp !== input.otp) {
            await redis_1.redis.incr(attemptsKey);
            await redis_1.redis.expire(attemptsKey, 600);
            throw new AppError_1.default("رمز التحقق غير صحيح", 400);
        }
        await redis_1.redis.del(attemptsKey);
        const user = await user_repository_1.UserRepository.create(parsed.user);
        await redis_1.redis.del(`otp:${input.identifier}`);
        const accessToken = jwt_1.JwtService.signAccess({
            id: user._id,
            role: user.role,
        });
        const refreshToken = jwt_1.JwtService.signRefresh({
            id: user._id,
        });
        await redis_1.redis.set(`session:${user._id}`, refreshToken, "EX", 7 * 24 * 60 * 60);
        return { user, accessToken, refreshToken };
    }
    static async login(identifier, password) {
        const input = (0, validate_1.validate)(auth_validation_1.loginSchema, { identifier, password });
        const user = await user_repository_1.UserRepository.findByEmailOrPhone(input.identifier, input.identifier);
        if (!user) {
            throw new AppError_1.default("المستخدم غير موجود", 404);
        }
        const match = await bcryptjs_1.default.compare(input.password, user.password);
        if (!match) {
            throw new AppError_1.default("كلمة المرور غير صحيحة", 401);
        }
        const accessToken = jwt_1.JwtService.signAccess({
            id: user._id,
            role: user.role,
        });
        const refreshToken = jwt_1.JwtService.signRefresh({
            id: user._id,
        });
        await redis_1.redis.set(`session:${user._id}`, refreshToken, "EX", 7 * 24 * 60 * 60);
        return { user, accessToken, refreshToken };
    }
    static async refresh(refreshToken) {
        const input = (0, validate_1.validate)(auth_validation_1.refreshSchema, { refreshToken });
        const decoded = jwt_1.JwtService.verifyRefresh(input.refreshToken);
        const stored = await redis_1.redis.get(`session:${decoded.id}`);
        if (!stored || stored !== input.refreshToken) {
            throw new AppError_1.default("جلسة غير صالحة", 401);
        }
        const newAccess = jwt_1.JwtService.signAccess({
            id: decoded.id,
        });
        const newRefresh = jwt_1.JwtService.signRefresh({
            id: decoded.id,
        });
        await redis_1.redis.set(`session:${decoded.id}`, newRefresh, "EX", 7 * 24 * 60 * 60);
        return { accessToken: newAccess, refreshToken: newRefresh };
    }
    static async logout(userId) {
        await redis_1.redis.del(`session:${userId}`);
        return { message: "تم تسجيل الخروج" };
    }
    static async forgotPassword(identifier) {
        const input = (0, validate_1.validate)(auth_validation_1.forgotPasswordSchema, { identifier });
        const user = await user_repository_1.UserRepository.findByEmailOrPhone(input.identifier, input.identifier);
        if (!user) {
            throw new AppError_1.default("المستخدم غير موجود", 404);
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await redis_1.redis.set(`forgot:${input.identifier}`, JSON.stringify({
            otp,
            userId: user._id,
        }), "EX", 600);
        console.log("FORGOT OTP:", otp);
        return { message: "تم إرسال رمز إعادة التعيين", otp };
    }
    static async resetPassword(identifier, otp, newPassword) {
        const input = (0, validate_1.validate)(auth_validation_1.resetPasswordSchema, {
            identifier,
            otp,
            newPassword,
        });
        const data = await redis_1.redis.get(`forgot:${input.identifier}`);
        if (!data) {
            throw new AppError_1.default("انتهت صلاحية الرمز", 400);
        }
        const parsed = JSON.parse(data);
        if (parsed.otp !== input.otp) {
            throw new AppError_1.default("رمز غير صحيح", 400);
        }
        const hashed = await bcryptjs_1.default.hash(input.newPassword, 10);
        await user_repository_1.UserRepository.updatePassword(parsed.userId, hashed);
        await redis_1.redis.del(`forgot:${input.identifier}`);
        return { message: "تم تغيير كلمة المرور بنجاح" };
    }
    static async resendOtp(identifier) {
        const cooldownKey = `otp:cooldown:${identifier}`;
        const attemptsKey = `otp:resend:count:${identifier}`;
        const cooldown = await redis_1.redis.get(cooldownKey);
        if (cooldown) {
            throw new AppError_1.default("يرجى الانتظار قبل إعادة إرسال الرمز", 429);
        }
        const attempts = await redis_1.redis.get(attemptsKey);
        if (attempts && parseInt(attempts) >= 5) {
            throw new AppError_1.default("تم تجاوز عدد المحاولات المسموحة", 429);
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await redis_1.redis.set(`otp:${identifier}`, JSON.stringify({ otp }), "EX", 600);
        await redis_1.redis.incr(attemptsKey);
        await redis_1.redis.expire(attemptsKey, 600);
        await redis_1.redis.set(cooldownKey, "1", "EX", 60);
        console.log("RESEND OTP:", otp);
        return { message: "تم إرسال رمز جديد", otp };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map