import * as AppointmentModel from "../models/appointmentModel";
import * as UserModel from "../models/userModel";

interface CreateAppointmentInput {
  client_id: number;
  provider_id: number;
  start_date: string | Date;
  end_date: string | Date;
  title: string;
  description?: string;
}

interface UpdateAppointmentInput {
  client_id?: number;
  provider_id?: number;
  start_date?: string | Date;
  end_date?: string | Date;
  title?: string;
  description?: string;
}

export const listAppointments = async () => {
  return AppointmentModel.getAllAppointments();
};

export const getAppointmentById = async (id: number) => {
  return AppointmentModel.getAppointmentById(id);
};

export const createAppointment = async (data: CreateAppointmentInput) => {
  const { client_id, provider_id, start_date, end_date, title, description } =
    data;

  if (!client_id || !provider_id || !start_date || !end_date || !title) {
    throw new Error(
      "client_id, provider_id, start_date, end_date e title são obrigatórios"
    );
  }
  const start = new Date(start_date);
  const end = new Date(end_date);
  if (start >= end) {
    throw new Error("A data inicial deve ser anterior à data final");
  }
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  if (durationMinutes < 30) {
    throw new Error("O agendamento deve ter no mínimo 30 minutos de duração");
  }
  if (durationMinutes > 60) {
    throw new Error("O agendamento deve ter no máximo 1 hora de duração");
  }
  const startHour = start.getUTCHours() - 3; // UTC-3 (Brasília)
  const endHour = end.getUTCHours() - 3;
  if (
    startHour < 8 ||
    endHour > 18 ||
    (endHour === 18 && end.getMinutes() > 0)
  ) {
    throw new Error(
      "O agendamento deve estar dentro do horário comercial: 08:00 às 18:00"
    );
  }
  const validMinutes = [0, 30];
  if (
    !validMinutes.includes(start.getMinutes()) ||
    !validMinutes.includes(end.getMinutes())
  ) {
    throw new Error(
      "O agendamento deve começar e terminar em horários fechados (00 ou 30 minutos)"
    );
  }
  const clientConflict = await AppointmentModel.findConflictingAppointment(
    client_id,
    start_date,
    end_date,
    "client_id"
  );
  if (clientConflict) {
    throw new Error(
      "O cliente já possui um agendamento neste intervalo de horário."
    );
  }
  const providerConflict = await AppointmentModel.findConflictingAppointment(
    provider_id,
    start_date,
    end_date,
    "provider_id"
  );
  if (providerConflict) {
    throw new Error(
      "O prestador de serviço já possui um agendamento neste intervalo de horário."
    );
  }
  const duplicate = await AppointmentModel.findExactDuplicate(
    client_id,
    provider_id,
    start_date,
    end_date
  );
  if (duplicate) {
    throw new Error("Este agendamento já foi criado anteriormente.");
  }
  const client = await UserModel.getUserById(client_id);
  if (!client || client.tipo !== "client") {
    throw new Error("Cliente inválido");
  }
  const provider = await UserModel.getUserById(provider_id);
  if (!provider || provider.tipo !== "provider") {
    throw new Error("Prestador de serviço inválido");
  }
  const appointment = await AppointmentModel.createAppointment({
    client_id,
    provider_id,
    start_date,
    end_date,
    title,
    description,
  });
  return appointment;
};

export const updateAppointment = async (
  id: number,
  data: UpdateAppointmentInput
) => {
  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum dado fornecido para atualização");
  }

  if (
    data.start_date &&
    data.end_date &&
    new Date(data.start_date) >= new Date(data.end_date)
  ) {
    throw new Error("start_date deve ser anterior a end_date");
  }

  const updated = await AppointmentModel.updateAppointment(id, data);
  return updated;
};

export const deleteAppointment = async (id: number) => {
  const deleted = await AppointmentModel.deleteAppointment(id);
  return deleted;
};
