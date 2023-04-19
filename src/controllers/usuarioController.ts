import { Usuario } from "../models/usuarioModel";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find();
    return res.status(200).json({
      message: "Lista de usuarios",
      content: usuarios,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener todas los usuarios",
      content: e.message,
    });
  }
};

export const getAllBySucursal = async (req:Request, res:Response)  => {
  const sucursalId = req.params.sucursal;
  try {
    const usuarios = await Usuario.find({ sucursal_id: sucursalId });
    return res.status(200).json({
      message: "Lista de usuarios activos",
      content: usuarios,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener todas los usuarios",
      content: e.message,
    });
  }
};

export const getAllActivatedBySucursal = async (req:Request, res:Response)  => {
  const sucursalId = req.params.sucursal;
  try {
    const usuarios = await Usuario.find({ estado: true, sucursal_id: sucursalId });
    return res.status(200).json({
      message: "Lista de usuarios activos",
      content: usuarios,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener todas los usuarios",
      content: e.message,
    });
  }
};

export const getById = async (req:Request, res:Response)  => {
  const usuarioId = req.params.usuario;
  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw "El usuario no existe";
    }
    return res.status(200).json({
      message: "Usuario obtenido",
      content: usuario,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener usuario",
      content: e.message,
    });
  }
};

export const create = async (req:Request, res:Response)  => {
  const usuario = req.body;
  try {
    const newUsuario = await Usuario.create(usuario);
    return res.status(201).json({
      message: "Usuario creada",
      content: newUsuario,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al crear usuario",
      content: e.message,
    });
  }
};

export const update = async (req:Request, res:Response) => {
  const usuarioId = req.params.usuario;
  const newInfoUsuario = req.body;
  try {
    const updateUsuario = await Usuario.findOneAndUpdate(
      { _id: usuarioId },
      { $set: newInfoUsuario },
      { new: true }
    );
    return res.status(200).json({
      message: "Usuario actuzalizada",
      content: updateUsuario,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener usuario",
      content: e.message,
    });
  }
};

export const eliminate = async (req:Request, res:Response)  => {
  const usuarioId = req.params.usuario;
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(usuarioId);
    return res.status(200).json({
      message: "Usuario borrada",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener usuairo",
      content: e.message,
    });
  }
};
