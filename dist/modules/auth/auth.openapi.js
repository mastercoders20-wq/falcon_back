"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../../docs/registry");
const auth_validation_1 = require("./auth.validation");
const auth_schema_1 = require("./auth.schema");
registry_1.registry.register("LoginResponse", auth_schema_1.LoginResponseSchema);
registry_1.registry.register("Message", auth_schema_1.MessageSchema);
/* =======================================================
REGISTER
======================================================= */
registry_1.registry.registerPath({
    method: "post",
    path: "/auth/register",
    tags: ["Auth"],
    summary: "Register new user",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: auth_validation_1.registerSchema,
                    example: {
                        name: "Yousef",
                        email: "yousef@example.com",
                        phone: "0999999999",
                        password: "123456",
                        role: "customer",
                    },
                },
            },
        },
    },
    responses: {
        "200": {
            description: "OTP Sent",
            content: {
                "application/json": {
                    schema: auth_schema_1.MessageSchema,
                },
            },
        },
        "400": {
            description: "Validation Error",
        },
        "409": {
            description: "User already exists",
        },
    },
});
/* =======================================================
VERIFY OTP
======================================================= */
registry_1.registry.registerPath({
    method: "post",
    path: "/auth/verify-otp",
    tags: ["Auth"],
    summary: "Verify OTP",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: auth_validation_1.verifyOtpSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Verified",
            content: {
                "application/json": {
                    schema: auth_schema_1.LoginResponseSchema,
                },
            },
        },
        "400": {
            description: "Invalid OTP",
        },
        "429": {
            description: "Too many requests",
        },
    },
});
/* =======================================================
LOGIN
======================================================= */
registry_1.registry.registerPath({
    method: "post",
    path: "/auth/login",
    tags: ["Auth"],
    summary: "Login",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: auth_validation_1.loginSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Login Success",
            content: {
                "application/json": {
                    schema: auth_schema_1.LoginResponseSchema,
                },
            },
        },
        "400": {
            description: "Validation Error",
        },
        "401": {
            description: "Unauthorized",
        },
    },
});
/* =======================================================
REFRESH
======================================================= */
registry_1.registry.registerPath({
    method: "post",
    path: "/auth/refresh",
    tags: ["Auth"],
    summary: "Refresh Token",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: auth_validation_1.refreshSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Token refreshed",
            content: {
                "application/json": {
                    schema: auth_schema_1.LoginResponseSchema,
                },
            },
        },
        "401": {
            description: "Unauthorized",
        },
    },
});
/* =======================================================
LOGOUT
======================================================= */
registry_1.registry.registerPath({
    method: "post",
    path: "/auth/logout",
    tags: ["Auth"],
    summary: "Logout",
    security: [
        {
            cookieAuth: [],
        },
    ],
    responses: {
        "200": {
            description: "Logout Success",
            content: {
                "application/json": {
                    schema: auth_schema_1.MessageSchema,
                },
            },
        },
        "401": {
            description: "Unauthorized",
        },
    },
});
/* =======================================================
FORGOT PASSWORD
======================================================= */
registry_1.registry.registerPath({
    method: "post",
    path: "/auth/forgot-password",
    tags: ["Auth"],
    summary: "Forgot Password",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: auth_validation_1.forgotPasswordSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "OTP Sent",
            content: {
                "application/json": {
                    schema: auth_schema_1.MessageSchema,
                },
            },
        },
        "400": {
            description: "Validation Error",
        },
    },
});
/* =======================================================
RESET PASSWORD
======================================================= */
registry_1.registry.registerPath({
    method: "post",
    path: "/auth/reset-password",
    tags: ["Auth"],
    summary: "Reset Password",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: auth_validation_1.resetPasswordSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Password Reset",
            content: {
                "application/json": {
                    schema: auth_schema_1.MessageSchema,
                },
            },
        },
        "400": {
            description: "Invalid OTP",
        },
        "429": {
            description: "Too many requests",
        },
    },
});
//# sourceMappingURL=auth.openapi.js.map