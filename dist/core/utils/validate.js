"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const zod_1 = require("zod");
const AppError_1 = __importDefault(require("../errors/AppError"));
function validate(schema, data) {
    console.log("VALIDATE START");
    try {
        return schema.parse(data);
    }
    catch (err) {
        console.log("VALIDATE ERROR");
        if (err instanceof zod_1.ZodError) {
            throw new AppError_1.default("خطأ في التحقق من البيانات", 400, err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })));
        }
        throw err;
    }
}
//# sourceMappingURL=validate.js.map