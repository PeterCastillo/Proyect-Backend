import { Sucursal } from "../models/sucursalModel";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    const sucursales = await Sucursal.find();
    return res.status(200).json({
      message: "Lista de sucursales",
      content: sucursales,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener sucursales",
      content: e.message,
    });
  }
};

export const getAllActivated = async (req: Request, res: Response) => {
  const sucursalId = req.params.sucursal;
  try {
    const sucursal = await Sucursal.findById(sucursalId);
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no existe" });
    }
    const sucursales = await Sucursal.find({
      empresa_id: sucursal.empresa_id,
      estado: true,
    });
    return res.status(200).json({
      message: "Lista de sucursales activas",
      content: sucursales,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener sucursales",
      content: e.message,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const sucursalId = req.params.sucursal;
  try {
    const sucursal = await Sucursal.findById(sucursalId);
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no existe" });
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

export const create = async (req: Request, res: Response) => {
  const sucursal = req.body;
  try {
    const sucursales = await Sucursal.find({
      $or: [{ sucursal: sucursal.sucursal }, { ubicacion: sucursal.ubicacion }],
    });
    if (sucursales.length) {
      return res
        .status(409)
        .json({ error: "Ya existe una sucursal con esas caracteristicas" });
    }
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

export const update = async (req: Request, res: Response) => {
  const sucursalId = req.params.sucursal;
  const newInfosucursal = req.body;
  try {
    const sucursalValidador = await Sucursal.find({
      $or: [
        { sucursal: newInfosucursal.sucursal },
        { ubicacion: newInfosucursal.ubicacion },
      ],
    });
    if (
      sucursalValidador.length &&
      sucursalValidador.some((item) => item._id != sucursalId)
    ) {
      return res
        .status(409)
        .json({ error: "Ya existe una sucursal con esas caracteristicas" });
    }
    const updatedSucursal = await Sucursal.findOneAndUpdate(
      { _id: sucursalId },
      { $set: newInfosucursal },
      { new: true }
    );
    if (!updatedSucursal) {
      return res.status(404).json({ error: "Sucursal no existe" });
    }
    return res.status(200).json({
      message: "Sucursal actuzalizada",
      content: updatedSucursal,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al actuzalizada sucursal",
      content: e.message,
    });
  }
};

export const eliminate = async (req: Request, res: Response) => {
  const sucursalId = req.params.sucursal;
  try {
    const sucursal = await Sucursal.findOne({ sucursal: sucursalId });
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no existe" });
    }
    const deletedSucursal = await Sucursal.findByIdAndDelete(sucursalId);
    return res.status(200).json({
      message: "Sucursal eliminada",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al eliminar sucursal",
      content: e.message,
    });
  }
};

export const getAllBySucursal = async (req: Request, res: Response) => {
  const sucursalId = req.params.sucursal;
  try {
    const sucursal = await Sucursal.findById(sucursalId);
    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no existe" });
    }
    const sucursales = await Sucursal.find({ empresa_id: sucursal.empresa_id });
    return res.status(200).json({
      message: "Lista de sucursales",
      content: sucursales,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener sucursales",
      content: e.message,
    });
  }
};
