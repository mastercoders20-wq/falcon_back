"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../core/middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", (req, res, next) => {
    console.log("REGISTER ROUTE");
    next();
}, auth_controller_1.AuthController.register);
router.post("/verify-otp", auth_controller_1.AuthController.verifyOtp);
router.post("/login", auth_controller_1.AuthController.login);
router.post("/refresh", auth_controller_1.AuthController.refresh);
router.post("/logout", auth_middleware_1.authMiddleware, auth_controller_1.AuthController.logout);
router.post("/forgot-password", auth_controller_1.AuthController.forgotPassword);
router.post("/reset-password", auth_controller_1.AuthController.resetPassword);
router.post("/resend-otp", auth_controller_1.AuthController.resendOtp);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map