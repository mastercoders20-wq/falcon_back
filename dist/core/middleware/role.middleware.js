"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            throw new AppError_1.default("غير مصرح بالدخول", 401);
        }
        if (!allowedRoles.includes(user.role)) {
            throw new AppError_1.default("غير مصرح لك بهذه العملية", 403);
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=role.middleware.js.map