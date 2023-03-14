import { Router } from "express";
import { login, registro } from "../controllers/usuarioController.js";
import { validadorToken } from "../utils/validadorToken.js";

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
 *      security:
 *          - Authorization: []
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

/**
 * @swagger
 * /login:
 *  post:
 *      summary: logear un usuario
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
 *              description: bienvenido usuario
 *          404: 
 *              description: usuario no encontrado
 *          409:
 *              description: contraseña incorrecta
 *                      
 */
    
usuarioRouter.post("/registro", validadorToken, registro);
usuarioRouter.post("/login", login);
