import express, { Request, RequestHandler, Response } from "express";
import { AuthMiddleware } from "../middleware/middleware.js";
import { AppController } from "../controllers/index.js";
import { Logger } from "../middleware/index.js";
import { TLSSocket } from "tls";

const router = express.Router();

const logger = new Logger();

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

router.get("/ack", AppController.getData);
router.post("/ack", AppController.addData);

export const AppRouter = router;
