import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.get("/", UserController.listUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.addUser);

export default router;
