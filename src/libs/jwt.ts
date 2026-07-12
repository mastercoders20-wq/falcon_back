import jwt from "jsonwebtoken";
import { env } from "../config/env";

export class JwtService {
  static signAccess(payload: object) {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.ACCESS_EXPIRES as any,
    });
  }

  static signRefresh(payload: object) {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.REFRESH_EXPIRES as any,
    });
  }

  static verifyAccess(token: string) {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  }

  static verifyRefresh(token: string) {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
  }
}