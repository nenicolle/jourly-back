import { Router } from "express";
import userRoutes from "./users";
import appointmentRoutes from "./appointments";
import scheduleRoutes from "./schedule";

const router = Router();

router.use("/users", userRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/schedule", scheduleRoutes);

export default router;
