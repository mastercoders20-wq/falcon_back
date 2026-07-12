import express from "express";
import cookieParser from "cookie-parser";

import apiV1 from "./api/v1";

import { swaggerMiddleware, swaggerSetup } from "./docs/swagger";
import { openApiDocument } from "./docs/openapi";

import { errorMiddleware } from "./core/middleware/error.middleware";

const app = express();
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", apiV1);

app.use("/docs", swaggerMiddleware, swaggerSetup);

app.get("/openapi.json", (_, res) => {
  res.json(openApiDocument);
});

/*
==========================
GLOBAL ERROR HANDLER
لازم يكون آخر middleware
==========================
*/

app.use((err: any, req: any, res: any, next: any) => {
  console.log("🔥 INLINE ERROR");
  res.status(500).json({
    message: err.message,
  });
});

export default app;
