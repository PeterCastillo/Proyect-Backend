import mongoose from "mongoose";
import { IEmpresa } from "../interfaces/empresaInterface";

const empresaSchema = new mongoose.Schema({
    nombre: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
})

export const Empresa = mongoose.model<IEmpresa>('empresas', empresaSchema)