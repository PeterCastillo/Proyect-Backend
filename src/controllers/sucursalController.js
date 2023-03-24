import { Sucursal } from "../models/sucursalModel.js";

export const getAll = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    return res.status(200).json({
      message: "Lista de sucursales",
      content: sucursales,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener todas las sucursales",
      content: e.message,
    });
  }
};

export const getAllActivated = async (req, res) => {
  try {
    const sucursales = await Sucursal.find({ estado: true });
    return res.status(200).json({
      message: "Lista de sucursales activas",
      content: sucursales,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener todas las sucursales",
      content: e.message,
    });
  }
};

export const getById = async (req, res) => {
  const sucursalId = req.params.sucursal;
  try {
    const sucursal = await Sucursal.findById(sucursalId);
    if (!sucursal) {
      throw "La sucursal no existe";
    }
    return res.status(200).json({
      message: "Sucursal obtenida",
      content: sucursal,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener sucursal",
      content: e.message,
    });
  }
};

export const create = async (req, res) => {
  const sucursal = req.body;
  try {
    const newSucursal = await Sucursal.create(sucursal);
    return res.status(201).json({
      message: "Sucursal creada",
      content: newSucursal,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al crear sucursal",
      content: e.message,
    });
  }
};

export const update = async (req, res) => {
  const sucursalId = req.params.sucursal;
  const newInfosucursal = req.body;
  try {
    const updatedSucursal = await Sucursal.findOneAndUpdate(
      { _id: sucursalId },
      { $set: newInfosucursal },
      { new: true }
    );
    return res.status(200).json({
      message: "Sucursal actuzalizada",
      content: updatedSucursal,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al actualizar sucursal",
      content: e.message,
    });
  }
};

export const eliminate = async (req, res) => {
  const sucursalId = req.params.sucursal;
  try {
    const updatedSucursal = await Sucursal.findOneAndDelete(sucursalId);
    return res.status(200).json({
      message: "Sucursal borrada",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al eliminar sucursal",
      content: e.message,
    });
  }
};
