import express, { Request, RequestHandler, Response } from "express";
import { AuthMiddleware } from "../middleware/middleware.js";
import { AppController } from "../controllers/index.js";
import { TLSSocket } from "tls";
import { loggers } from "winston";
import { Logger } from "../utils/index.js";
const logger = new Logger();

const router = express.Router();

// router
//   .route("/ack")
//   .post(
//     AuthMiddleware as unknown as RequestHandler,
//     async (req: Request, res: Response) => {
//       try {
//         // const { sdid, sid, ack } = req.body;
//         const { data } = await AppController.browseAll(req);
//         res.status(200).json({
//           Message: "Hit API",
//           Data: req,
//         });
//         logger.info("Hit API");
//       } catch (error) {
//         logger.error(error);
//         res.status(500).json({
//           message: "Internal server error.",
//           error: process.env.NODE_ENV === "development" ? error : undefined,
//         });
//       } finally {
//         logger.info("Executed");
//       }
//     }
//   );
router.get("/", AppController.testEndpoit);
router.get("/ack", AppController.getData);
router.post("/ack", AppController.addData);
router.get("/ack/status/:sdid/", AppController.checkStatusSDID);
router.get("/error", (req, res, next) => {
  next(new Error("Test error")); // This will be caught by the error handler
});

// router.all("/ack/*", (req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });
export const AppRouter = router;
