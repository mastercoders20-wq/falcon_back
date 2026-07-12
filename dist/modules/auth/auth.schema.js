"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.LoginResponseSchema = exports.TokensSchema = exports.AuthUserSchema = void 0;
const zod_1 = require("zod");
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.AuthUserSchema = zod_1.z
    .object({
    _id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email().nullable(),
    phone: zod_1.z.string().nullable(),
    role: zod_1.z.enum(["customer", "driver", "restaurant", "admin"]),
    isVerified: zod_1.z.boolean(),
})
    .openapi("AuthUser");
exports.TokensSchema = zod_1.z
    .object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
})
    .openapi("Tokens");
exports.LoginResponseSchema = zod_1.z
    .object({
    user: exports.AuthUserSchema,
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
})
    .openapi("LoginResponse");
exports.MessageSchema = zod_1.z
    .object({
    message: zod_1.z.string(),
})
    .openapi("Message");
//# sourceMappingURL=auth.schema.js.map