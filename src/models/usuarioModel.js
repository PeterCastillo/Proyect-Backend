import mongoose from "mongoose";

const usuarioAccesoSchema = new mongoose.Schema({
    acceso: {
        alias: "acceso_usuario",
        type: mongoose.Schema.Types.String,
        required: true
    }
},{
    _id: false
})

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
    sucursal: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    accesos: [usuarioAccesoSchema]
},{
    timestamps: {
        createdAt: false,
        updatedAt: false,
        // createdAt: "fecha_creacion"
    }
})

export const Usuario = mongoose.model('usuarios', usuarioSchema)