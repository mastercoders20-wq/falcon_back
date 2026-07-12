import { Router } from "express";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorize } from "../../core/middleware/rbac.middleware";
import { RestaurantController } from "../restaurant/restaurant.controller";

const router = Router();

router.post(
  "/restaurants",
  authMiddleware,
  authorize("admin"),
  RestaurantController.create,
);

export default router;