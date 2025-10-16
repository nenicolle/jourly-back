import db from "../config/db";

export const getAllUsers = async () => {
  return db("users").select("*");
};

export const getUserById = async (id: number) => {
  return db("users").where({ id }).first();
};

export const createUser = async (user: {
  nome: string;
  cpf: string;
  tipo: "client" | "provider";
}) => {
  return db("users").insert(user).returning("*");
};
