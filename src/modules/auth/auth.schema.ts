import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const AuthUserSchema = z
  .object({
    _id: z.string(),

    name: z.string(),

    email: z.string().email().nullable(),

    phone: z.string().nullable(),

    role: z.enum(["customer", "driver", "restaurant", "admin"]),

    isVerified: z.boolean(),
  })
  .openapi("AuthUser");

export const TokensSchema = z
  .object({
    accessToken: z.string(),

    refreshToken: z.string(),
  })
  .openapi("Tokens");

export const LoginResponseSchema = z
  .object({
    user: AuthUserSchema,

    accessToken: z.string(),

    refreshToken: z.string(),
  })
  .openapi("LoginResponse");

export const MessageSchema = z
  .object({
    message: z.string(),
  })
  .openapi("Message");
