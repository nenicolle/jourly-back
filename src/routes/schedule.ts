import { Router } from "express";
import * as ScheduleController from "../controllers/scheduleController";

const router = Router();

router.get("/provider/:providerId", ScheduleController.listProviderSchedule);
router.get("/client/:clientId", ScheduleController.listClientSchedule);

export default router;
