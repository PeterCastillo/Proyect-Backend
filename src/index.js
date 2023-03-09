import mongoose from "mongoose";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import { usuarioRouter } from "./router/usuarioRouter.js";

const servidor = express();
const PORT = process.env.PORT ?? 5000;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Restaurant Manager API",
      description: "Restaurant API information",
      contact: {
        name: "Restaurant Manager",
      },
      servers: "http://localhost:3000",
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

servidor.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
// La aplicacion entendera los json provenientes del cliente
servidor.use(express.json());
servidor.use(usuarioRouter);

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
