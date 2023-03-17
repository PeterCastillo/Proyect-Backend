import mongoose from "mongoose";

const sucursalSchema = new mongoose.Schema({
    sucursal: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    ubicacion: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    estado: {
        type: mongoose.Schema.Types.Boolean,
        require: true
    }
})

export const Sucursal = mongoose.model('sucursales', sucursalSchema)