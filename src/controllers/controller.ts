import { AppService } from "../services/index.js";
import { Request, Response } from "express";
export class AppController {
  public AppService: AppService;
  public static async browseAll(req: any) {
    const data = await AppService.browseAll();
    return data;
  }
  public static getData = async (req: Request, res: Response) => {
    const data = await AppService.getAllData();
    res.json(data);
  };

  public static addData = async (req: Request, res: Response) => {
    const newData = await AppService.createData(req.body);
    res.status(201).json({
      message: "Data created successfully",
      data: newData,
    });
  };

  public static checkStatusSDID = async (req: Request, res: Response) => {
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
  };
}
