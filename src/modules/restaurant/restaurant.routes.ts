import { Router } from "express";
import { RestaurantController } from "./restaurant.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorize } from "../../core/middleware/rbac.middleware";

const router = Router();

router.get("/", RestaurantController.getAll);
router.get("/:id", RestaurantController.getById);

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  RestaurantController.create,
);

router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  RestaurantController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  RestaurantController.delete,
);

router.patch(
  "/:id/toggle",
  authMiddleware,
  authorize("admin"),
  RestaurantController.toggle,
);

export default router;