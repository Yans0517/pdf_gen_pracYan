import { AppService } from '../services/index.js';

export class AppController {
  public AppService: AppService;
  public static async browseAll(req:any) {
    const data = await AppService.browseAll();
    return data;
  }
}
