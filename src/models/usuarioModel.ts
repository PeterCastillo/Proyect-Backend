import mongoose from "mongoose";
import { IUsuario } from "../interfaces/usuarioInterface";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    correo: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    contrasena: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    sucursal_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    accesos: {
        type: [mongoose.Schema.Types.String]
    }
},{
    timestamps: {
        createdAt: false,
        updatedAt: false,
        // createdAt: "fecha_creacion"
    }
})

export const Usuario = mongoose.model<IUsuario>('usuarios', usuarioSchema)