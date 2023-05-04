import { Router } from "express";
import { validadorToken } from "../middleware/validadorToken";
import {
  getAll,
  getAllActivatedBySucursal,
  getById,
  eliminate,
  update,
  getAllBySucursal,
  create,
} from "../controllers/usuarioController";

export const usuarioRouter = Router();

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
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *          example:
 *              _id:
 *                  6408fbadc2a0dd549e9501ab
 *      Usuario:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *              correo:
 *                  type: string
 *              contrasena:
 *                  type: boolean
 *              sucursal_id:
 *                  type: string
 *              accesos:
 *                  type: array
 *                  items:
 *                      type: string
 *          example:
 *              nombre:
 *                  Peter Castillo
 *              correo:
 *                  peterjackcc@gmail.com
 *              contrasena:
 *                  peter0022
 *              sucursal_id:
 *                  6408fbadc2a0dd549e9501ab
 *              accesos: ["usuarios", "mesas", "platillos"]
 */

/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: Obtener lista de Usuarios
 *      tags: [Usuario]
 *      responses:
 *          200:
 *              description: Lista de Sucursales
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          message:
 *                            type: string
 *                            example: Lista de Usuarios
 *                          content:
 *                            type: array
 *                            items:
 *                              allOf:
 *                                - $ref: '#/components/schemas/Usuario_id'
 *                                - $ref: '#/components/schemas/Usuario'
 */

/**
 * @swagger
 * /usuarios/{sucursal}:
 *  get:
 *      security:
 *        - Authorization: []
 *      summary: Obtener lista de Usuarios por sucursal o  por empresa
 *      tags: [Usuario]
 *      parameters:
 *        - in: path
 *          name: sucursal
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: all
 *          schema:
 *            type: string
 *            enum:
 *              - "true"
 *              - "false"
 *          required: true
 *      responses:
 *          200:
 *              description: Lista de Usuarios por sucursal o empresa
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Lista de usuarios activos
 *                            content:
 *                              type: array
 *                              items:
 *                                allOf:
 *                                  - $ref: '#/components/schemas/Usuario_id'
 *                                  - $ref: '#/components/schemas/Usuario'
 */

/**
 * @swagger
 * /usuarios_activos/{sucursal}:
 *  get:
 *      security:
 *          - Authorization: []
 *      summary: Obtener lista de Usuarios Activos por sucursal
 *      tags: [Usuario]
 *      parameters:
 *          - in: path
 *            name: sucursal
 *            schema:
 *              type: string
 *            required: true
 *            description: sucursal_id
 *      responses:
 *          200:
 *              description: Lista de Usuarios Activos por sucursal
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Lista de usuarios activos
 *                            content:
 *                              type: array
 *                              items:
 *                                allOf:
 *                                  - $ref: '#/components/schemas/Usuario_id'
 *                                  - $ref: '#/components/schemas/Usuario'
 */

/**
 * @swagger
 * /usuarios/{usuario}:
 *  get:
 *      security:
 *          - Authorization: []
 *      summary: Obtener Usuario
 *      tags: [Usuario]
 *      parameters:
 *          - in: path
 *            name: usuario
 *            schema:
 *              type: string
 *            required: true
 *            description: usuario_ID
 *      responses:
 *          200:
 *              description: Usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Usuario obtenido
 *                            content:
 *                              type: object
 *                              allOf:
 *                               - $ref: '#/components/schemas/Usuario_id'
 *                               - $ref: '#/components/schemas/Usuario'
 *
 *
 */

/**
 * @swagger
 * /usuarios:
 *  post:
 *      security:
 *          - Authorization: []
 *      summary: Crear un Usuario
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Usuario creado
 *                            content:
 *                              type: object
 *                              allOf:
 *                                - $ref: '#/components/schemas/Usuario_id'
 *                                - $ref: '#/components/schemas/Usuario'
 */

/**
 * @swagger
 * /usuarios/{usuario}:
 *  put:
 *      security:
 *          - Authorization: []
 *      summary: Editar Usuario
 *      tags: [Usuario]
 *      parameters:
 *          - in: path
 *            name: usuario
 *            schema:
 *              type: string
 *            required: true
 *            description: usuario_id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/components/schemas/Usuario_id'
 *                          - $ref: '#/components/schemas/Usuario'
 *      responses:
 *          200:
 *              description: Usuario Actualizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Usuario actuzalizado
 *                            content:
 *                              type: object
 *                              allOf:
 *                                - $ref: '#/components/schemas/Usuario_id'
 *                                - $ref: '#/components/schemas/Usuario'
 */

/**
 * @swagger
 * /usuarios/{usuario}:
 *  delete:
 *      security:
 *          - Authorization: []
 *      summary: Eliminar Usuario
 *      tags: [Usuario]
 *      parameters:
 *          - in: path
 *            name: usuario
 *            schema:
 *              type: string
 *            required: true
 *            description: usuario_id
 *      responses:
 *          200:
 *              description: Usuario eliminado
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: Usuario borrado
 *
 */

usuarioRouter.get("/usuarios", getAll);
usuarioRouter.get("/usuarios/:sucursal", getAllBySucursal);
usuarioRouter.get(
  "/usuarios_activos/:sucursal",
  validadorToken,
  getAllActivatedBySucursal
);
usuarioRouter.get("/usuarios/:usuario", validadorToken, getById);
usuarioRouter.post("/usuarios", validadorToken, create);
usuarioRouter.put("/usuarios/:usuario", validadorToken, update);
usuarioRouter.delete("/usuarios/:usuario", validadorToken, eliminate);
