import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import { AppRouter } from "../routes/index";
import { AppService } from "../services/index.js";
import { errorCatchAllHandler } from "../middleware/middleware.js";

jest.mock("../services/index.js");

const app = express();
app.use(express.json());
app.use(AppRouter);
app.use(errorCatchAllHandler); // Add the error handler middleware

const mockToken = jwt.sign(
  { id: "test_id" },
  process.env.JWT_SECRET || "secret",
  {
    expiresIn: "1h",
  }
);

describe("AppController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /ack", () => {
    it("should return all data", async () => {
      const mockData = [{ sdid: "123", sid: "Test", acknowledge: "Ack1" }];
      AppService.getAllData = jest.fn().mockResolvedValue(mockData);

      const response = await request(app)
        .get("/ack")
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });

    it("should return 500 if an error occurs", async () => {
      AppService.getAllData = jest.fn().mockRejectedValue(new Error("Error"));

      const response = await request(app)
        .get("/ack")
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({
        code: "Error",
        message: "Error",
        innerError: expect.objectContaining({
          requestId: expect.any(String),
          date: expect.any(String),
        }),
      });
    });
  });

  describe("POST /ack", () => {
    it("should create new data and return a success message", async () => {
      const mockPayload = { sdid: "123", sid: "Test", acknowledge: "Ack1" };
      AppService.createData = jest.fn().mockResolvedValue(mockPayload);

      const response = await request(app)
        .post("/ack")
        .send(mockPayload)
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Data created successfully");
      expect(response.body.data).toEqual(mockPayload);
    });

    it("should return 500 if an error occurs during data creation", async () => {
      AppService.createData = jest
        .fn()
        .mockRejectedValue(new Error("Internal error"));

      const response = await request(app)
        .post("/ack")
        .send({})
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({
        code: "Error",
        message: "Internal error",
        innerError: expect.objectContaining({
          requestId: expect.any(String),
          date: expect.any(String),
        }),
      });
    });
  });

  describe("GET /ack/status/:sdid", () => {
    it("should return the status of the SDID", async () => {
      const mockData = {
        sdid: "Test_true",
        sid: "Test_sid",
        acknowledge: "Test_ACk",
        status: true,
      };
      AppService.checkStatusSDID = jest
        .fn()
        .mockResolvedValue({ isActive: true });

      const response = await request(app)
        .get(`/ack/status/Test_true`)
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Data found",
        status: {
          isActive: true,
        },
      });
    });

    it("should return 404 if data is not found", async () => {
      AppService.checkStatusSDID = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .get("/ack/status/123")
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Data not found");
    });

    it("should return 500 if an error occurs", async () => {
      AppService.checkStatusSDID = jest
        .fn()
        .mockRejectedValue(new Error("Internal error"));

      const response = await request(app)
        .get("/ack/status/123")
        .set("Authorization", `Bearer ${mockToken}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({
        code: "Error",
        message: "Internal error",
        innerError: expect.objectContaining({
          requestId: expect.any(String),
          date: expect.any(String),
        }),
      });
    });
  });
});
