import { Usuario } from "../models/usuarioModel.js";

export const getAll = async (req, res) => {
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

export const getAllBySucursal = async (req, res) => {
  const sucursalId = req.params.sucursal;
  try {
    const usuarios = await Usuario.find({ sucursal: sucursalId });
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

export const getAllActivatedBySucursal = async (req, res) => {
  const sucursalId = req.params.sucursal;
  try {
    const usuarios = await Usuario.find({ estado: true , sucursal: sucursalId });
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

export const getById = async (req, res) => {
  const usuarioId = req.params.usuario;
  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw "La usuario no existe";
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

export const create = async (req, res) => {
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

export const update = async (req, res) => {
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

export const eliminate = async (req, res) => {
  const usuarioId = req.params.usuario;
  try {
    const usuarioEliminado = await Usuario.findOneAndDelete(usuarioId);
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
