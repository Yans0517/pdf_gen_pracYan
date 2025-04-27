import express, { Request, RequestHandler, Response } from "express";
import {
  AuthMiddleware,
  authTokenMiddleware,
  errorCatchAllHandler,
} from "../middleware/middleware.js";
import { AppController } from "../controllers/index.js";
import { TLSSocket } from "tls";
import { loggers } from "winston";
import { Logger } from "../utils/index.js";
const logger = new Logger();

const router = express.Router();
router.use((req, res, next) => {
  if (req.path === "/generate-token") {
    return next();
  }
  authTokenMiddleware(req, res, next);
});

router.get("/ack", AppController.getData);
router.post("/ack", AppController.addData);
router.get("/ack/status/:sdid/", AppController.checkStatusSDID);
router.get("/generate-token", AppController.generateToken);
router.get("/error", (req, res, next) => {
  next(new Error("Test error")); // This will be caught by the error handler
});
export const AppRouter = router;
