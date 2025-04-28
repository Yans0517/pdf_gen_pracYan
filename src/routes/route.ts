import express, { Request, RequestHandler, Response } from "express";
import { authTokenMiddleware } from "../middleware/middleware.js";
import { AppController } from "../controllers/index.js";

import { asyncHandler, Logger } from "../utils/index.js";

const router = express.Router();

// This middleware will check the token for all routes except "/generate-token"
router.use((req, res, next) => {
  if (req.path === "/generate-token") {
    return next();
  }
  authTokenMiddleware(req, res, next);
});

router.get("/ack", asyncHandler(AppController.getData));
router.post("/ack", asyncHandler(AppController.addData));
router.get("/ack/status/:sdid/", asyncHandler(AppController.checkStatusSDID));
router.get("/generate-token", asyncHandler(AppController.generateToken));

export const AppRouter = router;
