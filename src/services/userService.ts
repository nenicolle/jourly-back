import * as UserModel from "../models/userModel";

interface CreateUserInput {
  nome: string;
  cpf: string;
  tipo: "client" | "provider";
}

export const listUsers = async () => {
  return UserModel.getAllUsers();
};

export const getUserById = async (id: number) => {
  return UserModel.getUserById(id);
};

export const createUser = async (data: CreateUserInput) => {
  const { nome, cpf, tipo } = data;

  if (!nome || !cpf || !tipo) {
    throw new Error("nome, cpf e tipo são obrigatórios");
  }
  if (!["client", "provider"].includes(tipo)) {
    throw new Error("tipo deve ser client ou provider");
  }

  const user = await UserModel.createUser({ nome, cpf, tipo });
  return user;
};
