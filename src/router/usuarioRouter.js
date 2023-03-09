import { Router } from "express";
import { login, registro } from "../controllers/usuarioController.js";

export const usuarioRouter = Router();

//crear usuario
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
 * /registro:
 *  post:
 *      summary: registrar un nuevo usuario
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
 *              description: nuevo usuario creado
 *                  
 */


usuarioRouter.post("/registro", registro);
usuarioRouter.post("/login", login);
