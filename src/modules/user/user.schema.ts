import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserRoleSchema = z.enum([
  "customer",
  "driver",
  "restaurant",
  "admin",
]);

export const UserResponseSchema = z
  .object({
    _id: z.string().openapi({
      example: "6870d1b5e0b5d0bfe7d6c123",
    }),

    name: z.string().openapi({
      example: "Yousef AboKassem",
    }),

    email: z.string().email().nullable().openapi({
      example: "user@gmail.com",
    }),

    phone: z.string().nullable().openapi({
      example: "0999999999",
    }),

    isVerified: z.boolean().openapi({
      example: true,
    }),

    role: UserRoleSchema.openapi({
      example: "customer",
    }),

    createdAt: z.string().datetime(),

    updatedAt: z.string().datetime(),
  })
  .openapi("User");

export const UsersResponseSchema = z
  .array(UserResponseSchema)
  .openapi("Users");