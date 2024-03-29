import bcryptjs from "bcryptjs";
import { Sucursal } from "../models/sucursalModel";
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
      message: "Error al obtener usuarios",
      content: e.message,
    });
  }
};

export const getAllBySucursal = async (req: Request, res: Response) => {
  const sucursalId = req.params.sucursal;
  const all = req.query.all === "true";
  try {
    const sucursal = await Sucursal.findById(sucursalId);
    if (!sucursal) {
      return res.status(404).json({ message: "Sucursal no existe" });
    }
    const usuarios = await Usuario.aggregate([
      {
        $match: all ? {} : { sucursal_id: sucursal._id },
      },
      {
        $lookup: {
          from: "sucursales",
          let: { sucursal_id: "$sucursal_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$sucursal_id"] },
                empresa_id: sucursal.empresa_id,
              },
            },
          ],
          as: "sucursal",
        },
      },
      { $unwind: "$sucursal" },
    ]);

    return res.status(200).json({
      message: all
        ? "Lista de usuarios activos de la empresa"
        : "Lista de usuarios activos de la empresa",
      content: usuarios.filter((item) => item.sucursal_id),
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener usuarios",
      content: e.message,
    });
  }
};

export const getAllActivatedBySucursal = async (
  req: Request,
  res: Response
) => {
  const sucursalId = req.params.sucursal;
  try {
    const sucursal = await Sucursal.findById(sucursalId);
    if (!sucursal) {
      return res.status(404).json({ message: "Sucursal no existe" });
    }
    const usuarios = await Usuario.find({
      estado: true,
      sucursal_id: sucursalId,
    });
    return res.status(200).json({
      message: "Lista de usuarios activos",
      content: usuarios,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener usuarios",
      content: e.message,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const usuarioId = req.params.usuario;
  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no existe" });
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

export const create = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const validaroCorreo = await Usuario.findOne({ correo: data.correo });
    if (validaroCorreo) {
      return res.status(409).json({
        message: "Correo registrado",
      });
    }
    const contrasena = bcryptjs.hashSync(data.contrasena, 10);
    const nuevoUsuario = await Usuario.create({
      ...data,
      contrasena,
    });
    res.status(201).json({
      message: "Usuario creado exitosamente",
      content: nuevoUsuario,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al crear el usuario",
      content: e.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const usuarioId = req.params.usuario;
  const newInfoUsuario = req.body;
  try {
    const usuairos = await Usuario.find({ correo: newInfoUsuario.correo});
    if (usuairos.length && usuairos.some(item => item._id != usuarioId)) {
      return res
        .status(409)
        .json({ message: "Ya existe un Usuario con esas caracteristicas" });
    }
    const updateUsuario = await Usuario.findOneAndUpdate(
      { _id: usuarioId },
      {
        $set: newInfoUsuario.contrasena
          ? {
              ...newInfoUsuario,
              contrasena: bcryptjs.hashSync(newInfoUsuario.contrasena, 10),
            }
          : {
              nombre: newInfoUsuario.nombre,
              correo: newInfoUsuario.correo,
              accesos: newInfoUsuario.accesos,
              sucursal_id: newInfoUsuario.sucursal_id,
            },
      },
      { new: true }
    );
    if (!updateUsuario) {
      return res.status(404).json({ message: "Usuario no existe" });
    }
    return res.status(200).json({
      message: "Usuario actuzalizada",
      content: updateUsuario,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al actuzalizada usuario",
      content: e.message,
    });
  }
};

export const eliminate = async (req: Request, res: Response) => {
  const usuarioId = req.params.usuario;
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(usuarioId);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no existe" });
    }
    return res.status(200).json({
      message: "Usuario eliminado",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al eliminar usuairo",
      content: e.message,
    });
  }
};
