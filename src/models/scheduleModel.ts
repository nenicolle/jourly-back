import db from "../config/db";

export const getAppointmentsByProviderId = async (providerId: number) => {
  return db("appointments")
    .select(
      "appointments.id",
      "appointments.start_date",
      "appointments.end_date",
      "appointments.title",
      "clients.nome as client_name"
    )
    .leftJoin("users as clients", "appointments.client_id", "clients.id")
    .where("appointments.provider_id", providerId)
    .orderBy("appointments.start_date", "asc");
};
export const getAppointmentsByClientId = async (clientId: number) => {
  return db("appointments")
    .select(
      "appointments.id",
      "appointments.start_date",
      "appointments.end_date",
      "appointments.title",
      "clients.nome as client_name"
    )
    .leftJoin("users as clients", "appointments.client_id", "clients.id")
    .where("appointments.client_id", clientId)
    .orderBy("appointments.start_date", "asc");
};
