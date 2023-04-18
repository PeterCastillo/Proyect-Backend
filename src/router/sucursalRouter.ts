import { Router } from "express";
import { validadorToken } from "../middleware/validadorToken";
import {
  getAll,
  getAllActivated,
  getById,
  create,
  eliminate,
  update,
} from "../controllers/sucursalController";

export const sucursalRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Sucursal_id:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *          example:
 *              _id:
 *                  6408fbadc2a0dd549e9501ab
 *      Sucursal:
 *          type: object
 *          properties:
 *              sucursal:
 *                  type: string
 *              ubicacion:
 *                  type: string
 *              estado:
 *                  type: boolean
 *              empresa_id:
 *                  type: string
 *          example:
 *              sucursal:
 *                  Tomas Valden
 *              ubicacion:
 *                  San Miguel av.401
 *              estado:
 *                  true
 *              empresa_id:
 *                  6408fbadc2a0dd549e9501ab
 */

/**
 * @swagger
 * /sucursales:
 *  get:
 *      security:
 *          - Authorization: []
 *      summary: Obtener lista de Sucursales
 *      tags: [Sucursal]
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
 *                            example: Lista de sucursales
 *                          content:
 *                            type: array
 *                            items:
 *                              allOf:
 *                                - $ref: '#/components/schemas/Sucursal_id'
 *                                - $ref: '#/components/schemas/Sucursal'
 */

/**
 * @swagger
 * /sucursales_activas:
 *  get:
 *      security:
 *          - Authorization: []
 *      summary: Obtener lista de Sucursales Activas
 *      tags: [Sucursal]
 *      responses:
 *          200:
 *              description: Lista de Sucursales Activas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Lista de sucursales activas
 *                            content:
 *                              type: array
 *                              items:
 *                                allOf:
 *                                  - $ref: '#/components/schemas/Sucursal_id'
 *                                  - $ref: '#/components/schemas/Sucursal'
 */

/**
 * @swagger
 * /sucursales/{sucursal}:
 *  get:
 *      security:
 *          - Authorization: []
 *      summary: Obtener Sucursal
 *      tags: [Sucursal]
 *      parameters:
 *          - in: path
 *            name: sucursal
 *            schema:
 *              type: string
 *            required: true
 *            description: sucursal_id
 *      responses:
 *          200:
 *              description: Sucursal
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Sucursal obtenida
 *                            content:
 *                              type: object
 *                              allOf:
 *                               - $ref: '#/components/schemas/Sucursal_id'
 *                               - $ref: '#/components/schemas/Sucursal'
 *
 *
 */

/**
 * @swagger
 * /sucursales:
 *  post:
 *      security:
 *          - Authorization: []
 *      summary: Crear una Sucursal
 *      tags: [Sucursal]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Sucursal'
 *      responses:
 *          201:
 *              description: Nueva sucursal registrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Sucursal creada
 *                            content:
 *                              type: object
 *                              allOf:
 *                                - $ref: '#/components/schemas/Sucursal_id'
 *                                - $ref: '#/components/schemas/Sucursal'
 */

/**
 * @swagger
 * /sucursales/{sucursal}:
 *  put:
 *      security:
 *          - Authorization: []
 *      summary: Editar sucursal
 *      tags: [Sucursal]
 *      parameters:
 *          - in: path
 *            name: sucursal
 *            schema:
 *              type: string
 *            required: true
 *            description: sucursal_id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/components/schemas/Sucursal_id'
 *                          - $ref: '#/components/schemas/Sucursal'
 *      responses:
 *          200:
 *              description: Sucursal Actualizada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Sucursal actuzalizada
 *                            content:
 *                              type: object
 *                              allOf:
 *                                - $ref: '#/components/schemas/Sucursal_id'
 *                                - $ref: '#/components/schemas/Sucursal'
 */

/**
 * @swagger
 * /sucursales/{sucursal}:
 *  delete:
 *      security:
 *          - Authorization: []
 *      summary: Eliminar Sucursal
 *      tags: [Sucursal]
 *      parameters:
 *          - in: path
 *            name: sucursal
 *            schema:
 *              type: string
 *            required: true
 *            description: sucursal_id
 *      responses:
 *          200:
 *              description: Sucursal eliminada
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: Sucursal borrada
 *
 */

sucursalRouter.get("/sucursales", validadorToken, getAll);
sucursalRouter.get("/sucursales_activas", validadorToken, getAllActivated);
sucursalRouter.get("/sucursales/:sucursal", validadorToken, getById);
sucursalRouter.post("/sucursales", validadorToken, create);
sucursalRouter.put("/sucursales/:sucursal", validadorToken, update);
sucursalRouter.delete("/sucursales/:sucursal", validadorToken, eliminate);
