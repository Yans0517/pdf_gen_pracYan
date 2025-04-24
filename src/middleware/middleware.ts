import { NextFunction, Request, Response } from "express";
import { Logger } from "./index.js";
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
