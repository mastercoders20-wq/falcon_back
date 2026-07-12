"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResponseSchema = exports.UserResponseSchema = exports.UserRoleSchema = void 0;
const zod_1 = require("zod");
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.UserRoleSchema = zod_1.z.enum([
    "customer",
    "driver",
    "restaurant",
    "admin",
]);
exports.UserResponseSchema = zod_1.z
    .object({
    _id: zod_1.z.string().openapi({
        example: "6870d1b5e0b5d0bfe7d6c123",
    }),
    name: zod_1.z.string().openapi({
        example: "Yousef AboKassem",
    }),
    email: zod_1.z.string().email().nullable().openapi({
        example: "user@gmail.com",
    }),
    phone: zod_1.z.string().nullable().openapi({
        example: "0999999999",
    }),
    isVerified: zod_1.z.boolean().openapi({
        example: true,
    }),
    role: exports.UserRoleSchema.openapi({
        example: "customer",
    }),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
})
    .openapi("User");
exports.UsersResponseSchema = zod_1.z
    .array(exports.UserResponseSchema)
    .openapi("Users");
//# sourceMappingURL=user.schema.js.map