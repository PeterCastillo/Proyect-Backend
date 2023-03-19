import { Usuario } from "../models/usuarioModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registro = async (req, res) => {
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

export const login = async (req, res) => {
  const data = req.body;
  try {
    const usuario = await Usuario.findOne({ correo: data.correo });
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    if (bcryptjs.compareSync(data.contrasena, usuario.contrasena)) {
      const token = jwt.sign(
        {
          id: usuario._id,
          nombre: usuario.nombre,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        message: "Binenvenido usuario",
        content: {
          id: usuario._id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          accesos: usuario.accesos,
          contrasena: usuario.contrasena,
          sucursal: usuario.sucursal,
          token: token,
        },
      });
    } else {
      return res.status(409).json({
        message: "Contraseña incorrecta",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error al logear el usuario",
      content: e.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  const data = req.body;
  try {
    const usuario = await Usuario.findOne({ correo: data.correo });
    if (usuario) {
      const token = jwt.sign(
        {
          id: usuario._id,
          nombre: usuario.nombre,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        message: "Nuevo token",
        content: {
          refresedToken: token,
        },
      });
    }
    res.status(404).json({
      message: "Usuario no encontrado",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al refrescar token",
      content: e.message,
    });
  }
};
