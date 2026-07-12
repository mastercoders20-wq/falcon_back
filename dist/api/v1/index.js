"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../../modules/auth/auth.routes"));
const admin_routes_1 = __importDefault(require("../../modules/admin/admin.routes"));
const restaurant_routes_1 = __importDefault(require("../../modules/restaurant/restaurant.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/admin", admin_routes_1.default);
router.use("/restaurants", restaurant_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map