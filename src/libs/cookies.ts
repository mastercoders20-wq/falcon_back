import { Response } from "express";
import { env } from "../config/env";

export class CookieService {
  static set(res: Response, accessToken: string, refreshToken: string) {
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  static clear(res: Response) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  }
}