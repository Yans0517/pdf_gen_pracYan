import { AppService } from "../services/index.js";
import { Request, Response } from "express";
import { Logger } from "../utils/index.js";

const logger = new Logger();
export class AppController {
  public AppService!: AppService;
  public static async browseAll(req: any) {
    const data = await AppService.browseAll();
    return data;
  }
  public static defaultRoute = async (req: Request, res: Response) => {
    res.sendStatus(403);
  };
  public static testEndpoit = async (req: Request, res: Response) => {
    try {
      res.json({ message: "TEST ENDPOINT" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    } finally {
      logger.info("✔️ Executed TEST ENDPOINT controller");
    }
  };
  public static getData = async (req: Request, res: Response) => {
    try {
      const data = await AppService.getAllData();
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "An error occurred",
          error: (error as Error).message,
        });
    } finally {
      logger.info("✔️ Executed GET DATA controller");
    }
  };

  public static addData = async (req: Request, res: Response) => {
    try {
      const newData = await AppService.createData(req.body);
      res.status(201).json({
        message: "Data created successfully",
        data: newData,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    } finally {
      logger.info("✔️ Executed CREATE DATA controller");
    }
  };

  public static checkStatusSDID = async (req: Request, res: Response) => {
    try {
      const { sdid } = req.params;
      const data = await AppService.checkStatusSDID(sdid);
      if (data) {
        res.status(200).json({
          message: "Data found",
          data: data,
        });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
      });
      logger.error("❌ Error checking status by SDID");
    }
    logger.info("✔️ Executed CHECK STATUS SDID controller");
  };
}
