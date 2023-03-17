import { Router } from "express";
import {
  login,
  registro,
} from "../controllers/usuarioController.js";
import { validadorToken } from "../utils/validadorToken.js";

export const authRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Usuario:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *              correo:
 *                  type: string
 *              contrasena:
 *                  type: string
 *              accesos:
 *                  type:  array
 *          example:
 *              nombre: Peter Castillo
 *              correo: peterjackc@gmail.com
 *              contrasena: peter0202
 *              accesos: []
 */

/**
 * @swagger
 * /auth/registro:
 *  post:
 *      security:
 *          - Authorization: []
 *      summary: Registrar un nuevo Usuario
 *      tags: [Usuario]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Usuario'
 *      responses:
 *          201:
 *              description: Nuevo usuario registrado
 *
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Logear un Usuario
 *      tags: [Usuario]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          correo:
 *                              type: string
 *                          contraseña:
 *                              type: string
 *                      example:
 *                          correo: jackcc@gmail.com
 *                          contrasena: peter2002
 *      responses:
 *          200:
 *              description: Bienvenido usuario
 *          404:
 *              description: Usuario no encontrado
 *          409:
 *              description: Contraseña incorrecta
 *
 */

authRouter.post("/auth/registro", validadorToken, registro);
authRouter.post("/auth/login", login);
