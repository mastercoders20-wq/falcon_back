"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const errorMiddleware = (err, req, res, next) => {
    console.log("🔥 ERROR MIDDLEWARE CALLED");
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors,
        });
    }
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            message: "Duplicate field",
            errors: [
                {
                    field,
                    message: `${field} already exists`,
                },
            ],
        });
    }
    console.error("🔥 Unexpected Error:", err);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [],
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map