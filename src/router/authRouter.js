import { Router } from "express";
import {
  login,
  refreshToken,
  registro,
} from "../controllers/authController.js";
import { validadorToken } from "../utils/validadorToken.js";

export const authRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Token:  
 *        type: object
 *        properties:
 *          token: 
 *            type: string
 *        example:
 *          token:
 *            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDhmYmFkYzJhMGRkNTQ5ZTk1MDFhYiIsIm5vbWJyZSI6InBldGZlciIsImlhdCI6MTY3OTE4Mjc1MiwiZXhwIjoxNjc5MjY5MTUyfQ.jv9raBd8T6IWDSJja2PTGWMMuEAApKRfU72V_2PCWk
 *      Usuario_id:
 *        type: object
 *        properties:
 *          _id:
 *            tpye: string
 *        example:
 *          _id: 
 *            6408fbadc2a0dd549e9501ab
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
 *              description: Usuario no encontrado
 *          409:
 *              description: Contraseña incorrecta
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
 *                  content:
 *                    type: object
 *                    properties:
 *                      refresedToken:
 *                        type: string
 *                example:
 *                  message: Nuevo token
 *                  content:
 *                    refresedToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDhmYmFkYzJhMGRkNTQ5ZTk1MDFhYiIsIm5vbWJyZSI6InBldGZlciIsImlhdCI6MTY3OTE4Mjc1MiwiZXhwIjoxNjc5MjY5MTUyfQ.jv9raBd8T6IWDSJja2PTGWMMuEAApKRfU72V_2PCWk
 */

authRouter.post("/auth/registro", validadorToken, registro);
authRouter.post("/auth/login", login);
authRouter.post("/auth/refresh", refreshToken);
