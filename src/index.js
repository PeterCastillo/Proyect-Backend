import mongoose from "mongoose";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import * as path from "path";
import { authRouter } from "./router/authRouter.js";
import { sucursalRouter } from "./router/sucursalRouter.js"
import { fileURLToPath } from "url";
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  apis: [`${path.join(__dirname, "./router/*.js")}`],
};

const servidor = express();
const PORT = process.env.PORT ?? 5000;

servidor.use(
  "/api-docs",
  SwaggerUi.serve,
  SwaggerUi.setup(swaggerJSDoc(swaggerOptions))
);
// La aplicacion entendera los json provenientes del cliente
servidor.use(cors())
servidor.use(express.json());
servidor.use(authRouter);
servidor.use(sucursalRouter)

servidor.listen(PORT, async () => {
  console.log(`Servidor Iniciado Correctamente en el Puerto: ${PORT}`);
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("conexion de la base de datos exitosa");
  } catch (e) {
    console.log(e);
  }
});
