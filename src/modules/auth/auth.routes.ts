import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";

const router = Router();
router.post(
  "/register",
  (req, res, next) => {
    console.log("REGISTER ROUTE");
    next();
  },
  AuthController.register,
);

router.post("/verify-otp", AuthController.verifyOtp);

router.post("/login", AuthController.login);

router.post("/refresh", AuthController.refresh);

router.post("/logout", authMiddleware, AuthController.logout);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

router.post("/resend-otp", AuthController.resendOtp);
export default router;
