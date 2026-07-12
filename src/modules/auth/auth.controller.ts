import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { CookieService } from "../../libs/cookies";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    console.log("1- ENTER CONTROLLER");

    try {
      console.log("2- BEFORE SERVICE");

      const result = await AuthService.register(req.body);
      console.log("3- AFTER SERVICE");

      return res.json(result);
    } catch (err) {
      console.log("4_CONTROLLER CATCH");
      console.log(err);
      next(err);
    }
  }

  static async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, otp } = req.body;

      const result = await AuthService.verifyOtp(identifier, otp);

      CookieService.set(res, result.accessToken, result.refreshToken);

      return res.json({ user: result.user });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, password } = req.body;

      const result = await AuthService.login(identifier, password);

      CookieService.set(res, result.accessToken, result.refreshToken);

      return res.json({ user: result.user });
    } catch (err) {
      next(err);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refresh_token;

      const result = await AuthService.refresh(token);

      CookieService.set(res, result.accessToken, result.refreshToken);

      return res.json({ message: "تم التحديث" });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any)?.user?.id;

      await AuthService.logout(userId);

      CookieService.clear(res);

      return res.json({ message: "تم تسجيل الخروج" });
    } catch (err) {
      next(err);
    }
  }
  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier } = req.body;

      const result = await AuthService.forgotPassword(identifier);

      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, otp, newPassword } = req.body;

      const result = await AuthService.resetPassword(
        identifier,
        otp,
        newPassword,
      );

      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier } = req.body;

      const result = await AuthService.resendOtp(identifier);

      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
