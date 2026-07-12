"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordExample = exports.forgotPasswordExample = exports.logoutSuccessExample = exports.loginSuccessExample = exports.verifyOtpSuccessExample = exports.registerSuccessExample = void 0;
exports.registerSuccessExample = {
    success: true,
    message: "OTP sent successfully",
};
exports.verifyOtpSuccessExample = {
    success: true,
    message: "Account verified successfully",
    data: {
        user: {
            _id: "68751c9b4d8dcb2b",
            name: "Yousef",
            email: "admin@falcon.com",
            phone: "0999999999",
            role: "customer",
            isVerified: true,
        },
        accessToken: "access_token_here",
        refreshToken: "refresh_token_here",
    },
};
exports.loginSuccessExample = {
    success: true,
    message: "Login successful",
    data: {
        user: {
            _id: "68751c9b4d8dcb2b",
            name: "Admin",
            email: "admin@falcon.com",
            phone: "0999999999",
            role: "admin",
            isVerified: true,
        },
        accessToken: "access_token_here",
        refreshToken: "refresh_token_here",
    },
};
exports.logoutSuccessExample = {
    success: true,
    message: "Logged out successfully",
};
exports.forgotPasswordExample = {
    success: true,
    message: "OTP sent successfully",
};
exports.resetPasswordExample = {
    success: true,
    message: "Password reset successfully",
};
//# sourceMappingURL=auth.examples.js.map