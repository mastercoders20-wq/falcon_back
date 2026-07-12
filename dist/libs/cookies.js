"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieService = void 0;
const env_1 = require("../config/env");
class CookieService {
    static set(res, accessToken, refreshToken) {
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    static clear(res) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
    }
}
exports.CookieService = CookieService;
//# sourceMappingURL=cookies.js.map