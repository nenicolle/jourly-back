import { Request, Response } from "express";
import * as ScheduleService from "../services/scheduleService";

export const listProviderSchedule = async (req: Request, res: Response) => {
  try {
    const providerId = Number(req.params.providerId);
    const schedule = await ScheduleService.listProviderSchedule(providerId);
    res.json(schedule);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listClientSchedule = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.clientId);
    const schedule = await ScheduleService.listClientSchedule(clientId);
    res.json(schedule);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
