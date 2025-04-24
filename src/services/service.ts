import { payloadDB } from "../db/payloadDB.js";
import { AckPayloadType } from "../types/payload";
import { Logger } from "../utils/index.js";

const logger = new Logger();
export class AppService {
  public static async browseAll() {
    return { data: "Data" };
  }

  public static async getAllData() {
    try {
      return payloadDB;
    } catch (error) {
      logger.error("Error fetching all data:", error);
      throw new Error("Failed to fetch all data.");
    }
  }

  public static async createData(payload: AckPayloadType) {
    try {
      if (payloadDB.find((item) => item.sdid === payload.sdid)) {
        logger.warn("Duplicate data found, not creating new entry.");
        throw new Error("Duplicate data found.");
      }
      if (!payload.sdid || !payload.sid || !payload.acknowledge) {
        logger.warn("Missing required fields in payload.");
        throw new Error("Missing required fields in payload.");
      }
      payloadDB.push(payload);
      logger.info("✅ Data created successfully");
      return payload;
    } catch (error) {
      logger.error("❌ Error creating data");
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred.");
    }
  }

  public static async checkStatusSDID(sdid: string) {
    try {
      const data = payloadDB.find((item) => item.sdid === sdid);
      if (!data) {
        logger.warn(`No data found for SDID: ${sdid}`);
        throw new Error(`No data found for SDID: ${sdid}`);
      }
      return data;
    } catch (error) {
      logger.error("❌ Error checking status by SDID:");
      throw new Error("Failed to check status by SDID.");
    }
  }
}
