import { NextFunction, Request, Response } from "express";
import { Logger } from "./index.js";
import { AppService } from "../services/service.js";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const logger = new Logger();

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Auth");
  next();
};

export function errorCatchAllHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  const errorMessage = {
    error: {
      code: err.name,
      message: err.message,
      innerError: {
        requestId: "request-id",
        date: new Date(),
      },
    },
  };
  res.status(500).json(errorMessage).end();
  next();
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized: Not a valid token.");
  }
};
