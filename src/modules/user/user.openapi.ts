import { registry } from "../../docs/registry";
import { z } from "zod";
import { UserResponseSchema, UsersResponseSchema } from "./user.schema";

registry.register("User", UserResponseSchema);

registry.register("Users", UsersResponseSchema);

registry.registerPath({
  method: "get",

  path: "/users",

  tags: ["Users"],

  summary: "Get all users",

  description: "Returns all users",

  responses: {
    200: {
      description: "Users retrieved successfully",

      content: {
        "application/json": {
          schema: UsersResponseSchema,
        },
      },
    },
  },
});

/* ================= GET BY ID ================= */

registry.registerPath({
  method: "get",

  path: "/users/{id}",

  tags: ["Users"],

  summary: "Get user by id",

  request: {
    params: z.object({
      id: z.string(),
    }),
  },

  responses: {
    200: {
      description: "User retrieved successfully",

      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },

    404: {
      description: "User not found",
    },
  },
});
