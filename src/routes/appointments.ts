import { Router } from "express";
import * as AppointmentController from "../controllers/appointmentsController";

const router = Router();

router.get("/", AppointmentController.listAppointments);
router.get("/:id", AppointmentController.getAppointment);
router.post("/", AppointmentController.addAppointment);
router.put("/:id", AppointmentController.updateAppointment);
router.delete("/:id", AppointmentController.deleteAppointment);

export default router;
