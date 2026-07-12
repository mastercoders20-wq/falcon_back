"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../../docs/registry");
const zod_1 = require("zod");
const user_schema_1 = require("./user.schema");
registry_1.registry.register("User", user_schema_1.UserResponseSchema);
registry_1.registry.register("Users", user_schema_1.UsersResponseSchema);
registry_1.registry.registerPath({
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
                    schema: user_schema_1.UsersResponseSchema,
                },
            },
        },
    },
});
/* ================= GET BY ID ================= */
registry_1.registry.registerPath({
    method: "get",
    path: "/users/{id}",
    tags: ["Users"],
    summary: "Get user by id",
    request: {
        params: zod_1.z.object({
            id: zod_1.z.string(),
        }),
    },
    responses: {
        200: {
            description: "User retrieved successfully",
            content: {
                "application/json": {
                    schema: user_schema_1.UserResponseSchema,
                },
            },
        },
        404: {
            description: "User not found",
        },
    },
});
//# sourceMappingURL=user.openapi.js.map