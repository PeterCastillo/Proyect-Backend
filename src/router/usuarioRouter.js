import { Router } from "express";
import { login, registro } from "../controllers/usuarioController.js";

export const usuarioRouter = Router()

usuarioRouter.post("/registro", registro)
usuarioRouter.post("/login", login)