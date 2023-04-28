import mongoose from "mongoose";
import { ISucrusal } from "../interfaces/sucursalInterface";
import { Empresa } from "./empresaModel";

const sucursalSchema = new mongoose.Schema({
    sucursal: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    ubicacion: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    estado: {
        type: mongoose.Schema.Types.Boolean,
        require: true
    },
    empresa_id: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: Empresa
    },

})

export const Sucursal = mongoose.model<ISucrusal>('sucursales', sucursalSchema)