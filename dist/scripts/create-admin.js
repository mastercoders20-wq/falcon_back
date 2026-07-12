"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../core/database");
const user_model_1 = require("../modules/user/user.model");
const env_1 = require("../config/env");
dotenv_1.default.config();
async function createAdmin() {
    try {
        await (0, database_1.connectDatabase)();
        const exists = await user_model_1.UserModel.findOne({
            role: "admin",
        });
        if (exists) {
            process.exit(0);
        }
        const hashedPassword = await bcryptjs_1.default.hash(env_1.env.ADMIN_PASSWORD, 12);
        await user_model_1.UserModel.create({
            name: "System Admin",
            email: env_1.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
            isVerified: true,
        });
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
createAdmin();
//# sourceMappingURL=create-admin.js.map