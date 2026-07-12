import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./openapi";

export const swaggerMiddleware = swaggerUi.serve;

export const swaggerSetup = swaggerUi.setup(openApiDocument, {
  explorer: true,
});