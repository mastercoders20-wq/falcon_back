"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("./restaurant.controller");
const auth_middleware_1 = require("../../core/middleware/auth.middleware");
const rbac_middleware_1 = require("../../core/middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.get("/", restaurant_controller_1.RestaurantController.getAll);
router.get("/:id", restaurant_controller_1.RestaurantController.getById);
router.post("/", auth_middleware_1.authMiddleware, (0, rbac_middleware_1.authorize)("admin"), restaurant_controller_1.RestaurantController.create);
router.put("/:id", auth_middleware_1.authMiddleware, (0, rbac_middleware_1.authorize)("admin"), restaurant_controller_1.RestaurantController.update);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, rbac_middleware_1.authorize)("admin"), restaurant_controller_1.RestaurantController.delete);
router.patch("/:id/toggle", auth_middleware_1.authMiddleware, (0, rbac_middleware_1.authorize)("admin"), restaurant_controller_1.RestaurantController.toggle);
exports.default = router;
//# sourceMappingURL=restaurant.routes.js.map