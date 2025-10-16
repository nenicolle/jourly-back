import * as ScheduleModel from "../models/scheduleModel";
import * as UserModel from "../models/userModel";

export const listProviderSchedule = async (providerId: number) => {
  const provider = await UserModel.getUserById(providerId);

  if (!provider) throw new Error("Prestador de serviço não encontrado");
  if (provider.tipo !== "provider")
    throw new Error("Usuário informado não é um prestador de serviço");

  const appointments = await ScheduleModel.getAppointmentsByProviderId(
    providerId
  );

  return appointments.map((a) => ({
    id: a.id,
    title: a.title,
    client_name: a.client_name,
    start_time: a.start_date,
    end_time: a.end_date,
  }));
};

export const listClientSchedule = async (clientId: number) => {
  const client = await UserModel.getUserById(clientId);

  if (!client) throw new Error("Prestador de serviço não encontrado");
  if (client.tipo !== "client")
    throw new Error("Usuário informado não é um prestador de serviço");

  const appointments = await ScheduleModel.getAppointmentsByClientId(clientId);

  return appointments.map((a) => ({
    id: a.id,
    title: a.title,
    client_name: a.client_name,
    start_time: a.start_date,
    end_time: a.end_date,
  }));
};
