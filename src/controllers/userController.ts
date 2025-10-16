import { Request, Response } from "express";
import * as UserService from "../services/userService";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.listUsers();
    res.json(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);

    if (error.message.includes("nome") || error.message.includes("tipo")) {
      return res.status(400).json({ error: error.message });
    }

    if (error.code === "23505") {
      return res.status(409).json({ error: "CPF já cadastrado" });
    }

    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
