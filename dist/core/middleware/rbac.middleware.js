"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                return next(new AppError_1.default("غير مصرح", 401));
            }
            if (!roles.includes(user.role)) {
                return next(new AppError_1.default("ليس لديك صلاحية", 403));
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.authorize = authorize;
//# sourceMappingURL=rbac.middleware.js.map