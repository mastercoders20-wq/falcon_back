import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const userRoleSchema = z.enum([
  "customer",
  "driver",
  "restaurant",
  "admin",
]);

export const userSchema = z
  .object({
    _id: z.string(),

    name: z.string(),

    email: z.string().email().nullable(),

    phone: z.string().nullable(),

    isVerified: z.boolean(),

    role: userRoleSchema,

    createdAt: z.string().datetime(),

    updatedAt: z.string().datetime(),
  })
  .openapi("User");

export const updateUserSchema = z.object({
  name: z.string().min(2, "الاسم قصير جداً").optional(),

  phone: z.string().min(8, "رقم الهاتف غير صالح").optional(),
});
export const usersResponseSchema = z.array(userSchema).openapi("UsersResponse");
