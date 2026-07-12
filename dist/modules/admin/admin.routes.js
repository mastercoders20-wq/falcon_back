"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../core/middleware/auth.middleware");
const rbac_middleware_1 = require("../../core/middleware/rbac.middleware");
const restaurant_controller_1 = require("../restaurant/restaurant.controller");
const router = (0, express_1.Router)();
router.post("/restaurants", auth_middleware_1.authMiddleware, (0, rbac_middleware_1.authorize)("admin"), restaurant_controller_1.RestaurantController.create);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map