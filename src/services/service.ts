import { payloadDB } from "../db/payloadDB.js";
import { AckPayloadType } from "../types/payload";
import { Logger } from "../utils/index.js";
import { v4 as uuidv4 } from "uuid";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { json } from "express";

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
  public static async generateToken() {
    try {
      const payload = {
        id: "Test_id",
        sdid: "Test_sdid",
        sid: "Test_sid",
        acknowledge: "Test_ACk",
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET || " ", {
        expiresIn: "1h",
      });
      logger.info("✅ Token generated successfully");
      return token;
    } catch (error) {
      logger.error("❌ Error generating token:", error);
      throw new Error("Failed to generate token.");
    }
  }

  public static async createData(payload: AckPayloadType) {
    try {
      const id = uuidv4();
      const newPayload: AckPayloadType = {
        _id: id,
        sdid: payload.sdid,
        sid: payload.sid,
        acknowledge: payload.acknowledge,
        status: payload.status,
      };

      if (
        !newPayload.sdid ||
        !newPayload.sid ||
        !newPayload.acknowledge ||
        !newPayload.status
      ) {
        logger.warn("Missing required fields.");
        throw new Error("Missing required fields.");
      }

      if (payloadDB.find((item) => item._id === payload._id)) {
        logger.warn("Duplicate data found, not creating new entry.");
        throw new Error("Duplicate data found.");
      }

      payloadDB.push(newPayload);
      logger.info("✅ Data created successfully");

      // Generate a new UUID to avoid duplicate errors on subsequent requests
      const nextId = uuidv4();
      return newPayload;
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
      logger.info(`Data found for SDID: ${sdid}`);
      return { status: data.status };
    } catch (error) {
      logger.error("❌ Error checking status by SID:", error);
      throw new Error("Failed to check status by SID.");
    }
  }
}
