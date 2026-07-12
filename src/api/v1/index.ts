import { Router } from "express";

import authRoutes from "../../modules/auth/auth.routes";
import adminRoutes from "../../modules/admin/admin.routes";
import restaurantRoutes from "../../modules/restaurant/restaurant.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/admin", adminRoutes);

router.use("/restaurants", restaurantRoutes);

export default router;