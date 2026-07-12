"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersResponseSchema = exports.updateUserSchema = exports.userSchema = exports.userRoleSchema = void 0;
const zod_1 = require("zod");
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.userRoleSchema = zod_1.z.enum([
    "customer",
    "driver",
    "restaurant",
    "admin",
]);
exports.userSchema = zod_1.z
    .object({
    _id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email().nullable(),
    phone: zod_1.z.string().nullable(),
    isVerified: zod_1.z.boolean(),
    role: exports.userRoleSchema,
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
})
    .openapi("User");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "الاسم قصير جداً").optional(),
    phone: zod_1.z.string().min(8, "رقم الهاتف غير صالح").optional(),
});
exports.usersResponseSchema = zod_1.z.array(exports.userSchema).openapi("UsersResponse");
//# sourceMappingURL=user.validation.js.map