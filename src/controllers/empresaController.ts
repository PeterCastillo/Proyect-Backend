import { Empresa } from "../models/empresaModel";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    const empresas = await Empresa.find();
    return res.status(200).json({
      message: "Lista de empresas",
      content: empresas,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener todas las empresas",
      content: e.message,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const empresa = req.body;
  try {
    const empresaValidador = await Empresa.findOne({ nombre: empresa.nombre });
    if (empresaValidador) {
      return res
        .status(409)
        .json({ message: "Ya existe una empresa con esas caracteristicas" });
    }
    const newEmpresa = await Empresa.create(empresa);
    return res.status(201).json({
      message: "Empresa creada",
      content: newEmpresa,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al crear empresa",
      content: e.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const empresaId = req.params.empresa;
  const newInfoEmpresa = req.body;
  try {
    const empresaValidador = await Empresa.findOne({
      nombre: newInfoEmpresa.nombre,
    });
    if (empresaValidador && empresaValidador._id.toString() != empresaId) {
      return res
        .status(409)
        .json({ message: "Ya existe una empresa con esas caracteristicas" });
    }
    const updatedEmpresa = await Empresa.findOneAndUpdate(
      { _id: empresaId },
      { $set: newInfoEmpresa },
      { new: true }
    );
    if (!updatedEmpresa) {
      return res.status(404).json({ message: "Empresa no existe" });
    }
    return res.status(200).json({
      message: "Empresa actuzalizada",
      content: updatedEmpresa,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al actualizar empresa",
      content: e.message,
    });
  }
};

export const eliminate = async (req: Request, res: Response) => {
  const empresaId = req.params.empresa;
  try {
    const empresa = await Empresa.findByIdAndDelete(empresaId);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no existe" });
    }
    return res.status(200).json({
      message: "Empresa borrada",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al eliminar empresa",
      content: e.message,
    });
  }
};


export const tex =  async (req: Request, res: Response)  => {
  console.log("643ed39d965029fe6c5fc73a")
  const response = await Empresa.aggregate([
    {
      $lookup: {
        from: "sucursales",
        foreignField: "empresa_id",
        localField: "_id",
        as: "sucursales"
      }
    }
  ]);
  console.log(response)
}