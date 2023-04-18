import mongoose from "mongoose";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import { authRouter } from "./router/authRouter";
import { sucursalRouter } from "./router/sucursalRouter";
import { usuarioRouter } from "./router/usuarioRouter";
import cors from "cors";
import { empresaRouter } from "./router/empresaRouter";


const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant Manager API",
      description: "Restaurant API information",
      contact: {
        name: "Restaurant Manager",
      },
      version: "1.0.0",
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
  },
  apis: ["./src/router/*.ts"],
};

const servidor = express();
const PORT = process.env.PORT ?? 5000;

servidor.use(
  "/api-docs",
  SwaggerUi.serve,
  SwaggerUi.setup(swaggerJSDoc(swaggerOptions))
);
// La aplicacion entendera los json provenientes del cliente
servidor.use(cors());
servidor.use(express.json());
servidor.use(authRouter);
servidor.use(sucursalRouter);
servidor.use(usuarioRouter);
servidor.use(empresaRouter)

servidor.listen(PORT, async () => {
  console.log(`Servidor Iniciado Correctamente :  http://localhost:${PORT}/api-docs/`);
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL ?? "");
    console.log("conexion de la base de datos exitosa");
  } catch (e) {
    console.log(e);
  }
});
