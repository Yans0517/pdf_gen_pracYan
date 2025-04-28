import { AppService } from "../services/index.js";
import e, { Request, Response } from "express";
import { Logger } from "../utils/index.js";
import { loggers } from "winston";

const logger = new Logger();
export class AppController {
  public AppService!: AppService;

  public static defaultRoute = async (req: Request, res: Response) => {
    res.sendStatus(403);
  };

  public static getData = async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    try {
      const data = await AppService.getAllData();
      res.json(data);
    } catch (error) {
      // res.status(500).json({
      //   message: "An error occurred",
      //   error: (error as Error).message,
      // });
      next(error); // Pass the error to the middleware
    } finally {
      logger.info("✔️ Executed GET DATA controller");
    }
  };

  public static addData = async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    try {
      const newData = await AppService.createData(req.body);
      res.status(201).json({
        message: "Data created successfully",
        data: newData,
      });
    } catch (error) {
      next(error); // Pass the error to the middleware
    } finally {
      logger.info("✔️ Executed CREATE DATA controller");
    }
  };

  public static checkStatusSDID = async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    try {
      const { sdid } = req.params;
      const data = await AppService.checkStatusSDID(sdid);
      if (data) {
        res.status(200).json({
          message: "Data found",
          status: data,
        });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      // res.status(500).json({
      //   message: "An error occurred",
      // });
      next(error); // Pass the error to the middleware
      logger.error("❌ Error checking status by SDID");
    }
    logger.info("✔️ Executed CHECK STATUS SDID controller");
  };

  //Token generator using JWT
  public static generateToken = async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    try {
      const token = await AppService.generateToken();
      res.status(200).json({
        message: "Token generated successfully",
        token: token,
      });
      logger.silly(`TOKEN: ${token}`);
    } catch (error) {
      next(error); // Pass the error to the middleware
    } finally {
      logger.info("✔️ Executed GENERATE TOKEN controller");
    }
  };
}
