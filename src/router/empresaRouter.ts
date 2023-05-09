import { Router } from "express";
import {
  create,
  eliminate,
  update,
  getAll
} from "../controllers/empresaController";

export const empresaRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Empresa_id:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *          example:
 *              _id:
 *                  6408fbadc2a0dd549e9501ab
 *      Empresa:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *          example:
 *              nombre:
 *                  Fogon Rustico
 */

/**
 * @swagger
 * /empresas:
 *  get:
 *      summary: Obtener lista de Empresas
 *      tags: [Empresa]
 *      responses:
 *          200:
 *              description: Lista de Empresas
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          message:
 *                            type: string
 *                            example: Lista de Empresas
 *                          content:
 *                            type: array
 *                            items:
 *                              allOf:
 *                                - $ref: '#/components/schemas/Empresa_id'
 *                                - $ref: '#/components/schemas/Empresa'
 *          500:
 *            description: Error al obtener todas las empresas
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message: 
 *                      type: string
 *                      example: Error al obtener todas las empresas
 *                    content: 
 *                      type: string
 *                      example: Error interno del servidor
 *                    
 */

/**
 * @swagger
 * /empresas:
 *  post:
 *      summary: Crear una Empresa
 *      tags: [Empresa]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Empresa'
 *      responses:
 *          201:
 *              description: Nueva empresa registrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Empresa creada
 *                            content:
 *                              type: object
 *                              allOf:
 *                                - $ref: '#/components/schemas/Empresa_id'
 *                                - $ref: '#/components/schemas/Empresa'
 *          409:
 *            description: Ya existe una empresa con esas caracteristicas
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Ya existe una empresa con esas caracteristicas
 *          500:
 *            description: Error al crear empresa
 *            content:
 *              application/json: 
 *                schema:
 *                  type: object
 *                  properties:  
 *                    message: 
 *                      type: string
 *                      example: Error al crear empresa
 *                    content:
 *                      type: string
 *                      example: Error interno del servidor
 */

/**
 * @swagger
 * /empresas/{empresa}:
 *  put:
 *      summary: Editar empresa
 *      tags: [Empresa]
 *      parameters:
 *          - in: path
 *            name: empresa
 *            schema:
 *              type: string
 *            required: true
 *            description: empresa_id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/components/schemas/Empresa_id'
 *                          - $ref: '#/components/schemas/Empresa'
 *      responses:
 *          200:
 *              description: Empresa Actualizada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: Empresa actuzalizada
 *                            content:
 *                              type: object
 *                              allOf:
 *                                - $ref: '#/components/schemas/Empresa_id'
 *                                - $ref: '#/components/schemas/Empresa'
 *          404:
 *            description: Empresa no existe
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Empresa no existe
 *          409:
 *            description: Ya existe una empresa con esas caracteristicas
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Ya existe una empresa con esas caracteristicas
 *          500:
 *            description: Error al actualizar empresa
 *            content:
 *              application/json: 
 *                schema:
 *                  type: object
 *                  properties:  
 *                    message: 
 *                      type: string
 *                      example: Error al actualizar empresa
 *                    content:
 *                      type: string
 *                      example: Error interno del servidor
 */

/**
 * @swagger
 * /empresas/{empresa}:
 *  delete:
 *      summary: Eliminar Empresa
 *      tags: [Empresa]
 *      parameters:
 *          - in: path
 *            name: empresa
 *            schema:
 *              type: string
 *            required: true
 *            description: empresa_id
 *      responses:
 *          200:
 *              description: Empresa eliminada
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: Empresa borrada
 *          404:
 *            description: Empresa no existe
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Empresa no existe
 *          500:
 *            description: Error al eliminar empresa
 *            content:
 *              application/json: 
 *                schema:
 *                  type: object
 *                  properties:  
 *                    message: 
 *                      type: string
 *                      example: Error al eliminar empresa
 *                    content:
 *                      type: string
 *                      example: Error interno del servidor
 */


empresaRouter.get("/empresas", getAll);
empresaRouter.post("/empresas", create);
empresaRouter.put("/empresas/:empresa", update);
empresaRouter.delete("/empresas/:empresa", eliminate);
