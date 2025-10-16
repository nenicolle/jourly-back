import db from "../config/db";

export const getAllAppointments = async () => {
  return db("appointments").select("*");
};

export const getAppointmentById = async (id: number) => {
  return db("appointments").where({ id }).first();
};

export const createAppointment = async (appointment: {
  client_id: number;
  provider_id: number;
  start_date: string | Date;
  end_date: string | Date;
  title: string;
  description?: string;
}) => {
  return db("appointments").insert(appointment).returning("*");
};
export const findExactDuplicate = async (
  client_id: number,
  provider_id: number,
  start_date: string | Date,
  end_date: string | Date
) => {
  return db("appointments")
    .where({ client_id, provider_id, start_date, end_date })
    .first();
};

export const findConflictingAppointment = async (
  userId: number,
  startDate: string | Date,
  endDate: string | Date,
  field: "client_id" | "provider_id"
) => {
  return db("appointments")
    .where(field, userId)
    .andWhere(function () {
      this.whereBetween("start_date", [startDate, endDate])
        .orWhereBetween("end_date", [startDate, endDate])
        .orWhere(function () {
          this.where("start_date", "<", startDate).andWhere(
            "end_date",
            ">",
            endDate
          );
        });
    })
    .first();
};
export const updateAppointment = async (
  id: number,
  appointment: {
    client_id?: number;
    provider_id?: number;
    start_date?: string | Date;
    end_date?: string | Date;
    title?: string;
    description?: string;
  }
) => {
  return db("appointments").where({ id }).update(appointment).returning("*");
};

export const deleteAppointment = async (id: number) => {
  return db("appointments").where({ id }).del();
};
