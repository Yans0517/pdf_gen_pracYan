import { payloadDB } from "../db/payloadDB.js";

import { AckPayloadType } from "../types/payload";
export class AppService {
  public static async browseAll() {
    return { data: "Data" };
  }

  public static async getAllData() {
    return payloadDB;
  }

  public static async createData(payload: AckPayloadType) {
    payloadDB.push(payload);
    return payload;
  }

  public static async checkStatusSDID(sdid: string) {
    const data = payloadDB.find((item) => item.sdid === sdid);
    return data;
  }
}
