import { Sucursal } from "../models/sucursalModel";
import { Request, Response } from "express";

export const getAll = async (req:Request, res:Response)  => {
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

export const getAllActivated = async (req:Request, res:Response)  => {
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

export const getById = async (req:Request, res:Response)  => {
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

export const create = async  (req:Request, res:Response) => {
  const sucursal = req.body;
  try {
    const sucursales = await Sucursal.find()
    for (let index = 0; index < sucursales.length; index++) {
      const element = sucursales[index];
      if(element.ubicacion == sucursal.ubicacion && element.sucursal == sucursal.sucursal){
        return res.status(409).json({
          message: "Sucursal Existente"
        })
      }
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

export const update = async  (req:Request, res:Response)  => {
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

export const eliminate = async  (req:Request, res:Response)  => {
  const sucursalId = req.params.sucursal;
  try {
    const updatedSucursal = await Sucursal.findByIdAndDelete(sucursalId);
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