"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../../libs/jwt");
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_repository_1 = require("../../modules/user/user.repository");
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.access_token;
        if (!token) {
            throw new AppError_1.default("غير مصرح بالدخول", 401);
        }
        const decoded = jwt_1.JwtService.verifyAccess(token);
        const user = await user_repository_1.UserRepository.findById(decoded.id);
        if (!user) {
            throw new AppError_1.default("المستخدم غير موجود", 401);
        }
        if (!user.isVerified) {
            throw new AppError_1.default("الحساب غير مفعل", 403);
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map