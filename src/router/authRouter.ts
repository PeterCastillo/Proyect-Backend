import { Router } from "express";
import {
  login,
  refreshToken,
  registro,
} from "../controllers/authController";

export const authRouter = Router();

/**
 * @swagger
 * /auth/registro:
 *  post:
 *      summary: Registrar un nuevo Usuario
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      allOf:
 *                        - $ref: '#/components/schemas/Usuario'
 *      responses:
 *          201:
 *              description: Nuevo usuario registrado
 *              content:
 *                appplication/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message: 
 *                        type: string
 *                        example: Binenvenido usuario
 *                      content:
 *                        type: object
 *                        allOf:
 *                          - $ref: '#/components/schemas/Usuario_id'
 *                          - $ref: '#/components/schemas/Usuario' 
 *          409:
 *            description: Conflicto con correo
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string      
 *                      example: Correo registrado
 *          500:
 *            description: Error al crear usuario
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message: 
 *                      type: string
 *                      example: Error al crear usuario
 *                    content: 
 *                      type: string
 *                      example: Error
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Logear un Usuario
 *      tags: [Auth]
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
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message: 
 *                        type: string
 *                        example: Binenvenido usuario
 *                      content:
 *                        type: object
 *                        allOf:
 *                        - $ref: '#/components/schemas/Usuario_id' 
 *                        - $ref: '#/components/schemas/Usuario'  
 *                        - $ref: '#/components/schemas/Token'  
 *          404:
 *            description: Usuario no encontrado
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Usuario no encontrado
 *          409:
 *            description: Contraseña incorrecta
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Contraseña incorrecta
 *          500:
 *            description: Error al logear el usuario
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Error al logear el usuario
 *                    content:
 *                      type: string
 *                      example: Error interno del servidor
 *
 */

/**
 * @swagger
 * /auth/refresh:
 *  post:
 *      summary: Refrescar Token
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                correo:
 *                  type: string
 *              example:
 *                correo: jackcc@gmail.com
 *      responses:
 *        200:
 *          description: Nuevo Token
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Nuevo token
 *                  content:
 *                    type: object
 *                    properties:
 *                      refresedToken:
 *                        type: string
 *                        example: 123
 *        404:
 *          description: Usuario no encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Usuario no encontrado
 *        500:
 *          description: Error al logear el usuario
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al logear el usuario
 *                  content:
 *                    type: string
 *                    example: Error interno del servidor
 */

authRouter.post("/auth/registro", registro);
authRouter.post("/auth/login", login);
authRouter.post("/auth/refresh", refreshToken);
