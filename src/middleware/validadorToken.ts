import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction} from "express";

export const validadorToken = async (req: Request, res:Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Se necesita una token para esta operacion",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const result = jsonwebtoken.verify(token, process.env.JWT_SECRET ?? "");
    next()
} catch (e) {
    return res.status(400).json({
      message: "Token invalido",
      content: e.message,
    });
  }
};
