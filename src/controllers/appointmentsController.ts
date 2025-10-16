import { Request, Response } from "express";
import * as AppointmentService from "../services/appointmentsService";

export const listAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await AppointmentService.listAppointments();
    res.json(appointments);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar agendamentos" });
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await AppointmentService.getAppointmentById(
      Number(req.params.id)
    );
    if (!appointment)
      return res.status(404).json({ error: "Agendamento não encontrado" });
    res.json(appointment);
  } catch (error: any) {
    console.error(error);
    res.status(error).json({ error: "Erro ao buscar agendamento" });
  }
};

export const addAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await AppointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error: any) {
    console.error(error);

    if (error.message) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await AppointmentService.updateAppointment(
      Number(req.params.id),
      req.body
    );
    if (!appointment)
      return res.status(404).json({ error: "Agendamento não encontrado" });
    res.json(appointment);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar agendamento" });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const deleted = await AppointmentService.deleteAppointment(
      Number(req.params.id)
    );
    if (!deleted)
      return res.status(404).json({ error: "Agendamento não encontrado" });
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar agendamento" });
  }
};
