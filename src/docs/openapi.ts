import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { registry } from "./registry";

import "../modules/user/user.openapi";
import "../modules/auth/auth.openapi";

export const openApiDocument = new OpenApiGeneratorV3(
  registry.definitions,
).generateDocument({
  openapi: "3.0.3",

  info: {
    title: "Falcon Delivery API",
    version: "1.0.0",
    description: "Falcon Backend API",
  },

  servers: [
    {
      url: "http://localhost:5000/api/v1",
    },
  ],
});