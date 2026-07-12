import { registry } from "../../docs/registry";

import {
  registerSchema,
  verifyOtpSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.validation";

import { LoginResponseSchema, MessageSchema } from "./auth.schema";

registry.register("LoginResponse", LoginResponseSchema);
registry.register("Message", MessageSchema);

/* =======================================================
REGISTER
======================================================= */

registry.registerPath({
  method: "post",
  path: "/auth/register",
  tags: ["Auth"],
  summary: "Register new user",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: registerSchema,
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
          schema: MessageSchema,
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

registry.registerPath({
  method: "post",
  path: "/auth/verify-otp",
  tags: ["Auth"],
  summary: "Verify OTP",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: verifyOtpSchema,
        },
      },
    },
  },

  responses: {
    "200": {
      description: "Verified",

      content: {
        "application/json": {
          schema: LoginResponseSchema,
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

registry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  summary: "Login",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },

  responses: {
    "200": {
      description: "Login Success",

      content: {
        "application/json": {
          schema: LoginResponseSchema,
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

registry.registerPath({
  method: "post",
  path: "/auth/refresh",
  tags: ["Auth"],
  summary: "Refresh Token",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: refreshSchema,
        },
      },
    },
  },

  responses: {
    "200": {
      description: "Token refreshed",

      content: {
        "application/json": {
          schema: LoginResponseSchema,
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

registry.registerPath({
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
          schema: MessageSchema,
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

registry.registerPath({
  method: "post",
  path: "/auth/forgot-password",
  tags: ["Auth"],
  summary: "Forgot Password",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: forgotPasswordSchema,
        },
      },
    },
  },

  responses: {
    "200": {
      description: "OTP Sent",

      content: {
        "application/json": {
          schema: MessageSchema,
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

registry.registerPath({
  method: "post",
  path: "/auth/reset-password",
  tags: ["Auth"],
  summary: "Reset Password",

  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: resetPasswordSchema,
        },
      },
    },
  },

  responses: {
    "200": {
      description: "Password Reset",

      content: {
        "application/json": {
          schema: MessageSchema,
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
