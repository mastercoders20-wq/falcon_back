"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("5000"),
    MONGO_URI: zod_1.z.string(),
    REDIS_HOST: zod_1.z.string().default("127.0.0.1"),
    REDIS_PORT: zod_1.z.string().default("6379"),
    JWT_ACCESS_SECRET: zod_1.z.string(),
    JWT_REFRESH_SECRET: zod_1.z.string(),
    ACCESS_EXPIRES: zod_1.z.string().default("15m"),
    REFRESH_EXPIRES: zod_1.z.string().default("7d"),
    ADMIN_EMAIL: zod_1.z.string().email(),
    ADMIN_PASSWORD: zod_1.z.string().min(8),
    NODE_ENV: zod_1.z.enum(["development", "production"]).default("development"),
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map