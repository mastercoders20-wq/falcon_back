"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const cookies_1 = require("../../libs/cookies");
class AuthController {
    static async register(req, res, next) {
        console.log("1- ENTER CONTROLLER");
        try {
            console.log("2- BEFORE SERVICE");
            const result = await auth_service_1.AuthService.register(req.body);
            console.log("3- AFTER SERVICE");
            return res.json(result);
        }
        catch (err) {
            console.log("4_CONTROLLER CATCH");
            console.log(err);
            next(err);
        }
    }
    static async verifyOtp(req, res, next) {
        try {
            const { identifier, otp } = req.body;
            const result = await auth_service_1.AuthService.verifyOtp(identifier, otp);
            cookies_1.CookieService.set(res, result.accessToken, result.refreshToken);
            return res.json({ user: result.user });
        }
        catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { identifier, password } = req.body;
            const result = await auth_service_1.AuthService.login(identifier, password);
            cookies_1.CookieService.set(res, result.accessToken, result.refreshToken);
            return res.json({ user: result.user });
        }
        catch (err) {
            next(err);
        }
    }
    static async refresh(req, res, next) {
        try {
            const token = req.cookies?.refresh_token;
            const result = await auth_service_1.AuthService.refresh(token);
            cookies_1.CookieService.set(res, result.accessToken, result.refreshToken);
            return res.json({ message: "تم التحديث" });
        }
        catch (err) {
            next(err);
        }
    }
    static async logout(req, res, next) {
        try {
            const userId = req?.user?.id;
            await auth_service_1.AuthService.logout(userId);
            cookies_1.CookieService.clear(res);
            return res.json({ message: "تم تسجيل الخروج" });
        }
        catch (err) {
            next(err);
        }
    }
    static async forgotPassword(req, res, next) {
        try {
            const { identifier } = req.body;
            const result = await auth_service_1.AuthService.forgotPassword(identifier);
            return res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async resetPassword(req, res, next) {
        try {
            const { identifier, otp, newPassword } = req.body;
            const result = await auth_service_1.AuthService.resetPassword(identifier, otp, newPassword);
            return res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async resendOtp(req, res, next) {
        try {
            const { identifier } = req.body;
            const result = await auth_service_1.AuthService.resendOtp(identifier);
            return res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map