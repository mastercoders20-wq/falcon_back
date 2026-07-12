"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const v1_1 = __importDefault(require("./api/v1"));
const swagger_1 = require("./docs/swagger");
const openapi_1 = require("./docs/openapi");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", v1_1.default);
app.use("/docs", swagger_1.swaggerMiddleware, swagger_1.swaggerSetup);
app.get("/openapi.json", (_, res) => {
    res.json(openapi_1.openApiDocument);
});
/*
==========================
GLOBAL ERROR HANDLER
لازم يكون آخر middleware
==========================
*/
app.use((err, req, res, next) => {
    console.log("🔥 INLINE ERROR");
    res.status(500).json({
        message: err.message,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map