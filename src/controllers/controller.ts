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
}
