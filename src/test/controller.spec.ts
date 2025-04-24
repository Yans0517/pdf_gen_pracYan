import request from "supertest";
import express from "express";
import { AppRouter } from "../routes/index";
import { AppService } from "../services/index.js";

jest.mock("../services/index.js");

const app = express();
app.use(express.json());
app.use(AppRouter);

describe("AppController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    it("should return a test message", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("TEST ENDPOINT");
    });
  });

  describe("GET /ack", () => {
    it("should return all data", async () => {
      const mockData = [{ sdid: "123", sid: "Test", acknowledge: "Ack1" }];
      AppService.getAllData = jest.fn().mockResolvedValue(mockData);

      const response = await request(app).get("/ack");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });

    it("should return 500 if an error occurs", async () => {
      AppService.getAllData = jest.fn().mockRejectedValue(new Error("Error"));

      const response = await request(app).get("/ack");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("An error occurred");
    });
  });

  describe("POST /ack", () => {
    it("should create new data and return a success message", async () => {
      const mockPayload = { sdid: "123", sid: "Test", acknowledge: "Ack1" };
      AppService.createData = jest.fn().mockResolvedValue(mockPayload);

      const response = await request(app).post("/ack").send(mockPayload);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Data created successfully");
      expect(response.body.data).toEqual(mockPayload);
    });

    it("should return 500 if an error occurs during data creation", async () => {
      AppService.createData = jest
        .fn()
        .mockRejectedValue(new Error("Internal error"));

      const response = await request(app).post("/ack").send({});

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("An error occurred");
    });
  });

  describe("GET /ack/status/:sdid", () => {
    it("should return status data by SDID", async () => {
      const mockData = { sdid: "SDID1", sid: "sid 1", acknowledge: "Ack1" };
      AppService.checkStatusSDID = jest.fn().mockResolvedValue(mockData);

      const response = await request(app).get(`/ack/status/SDID1`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Data found");
      expect(response.body.data).toEqual(mockData);
    });

    it("should return 404 if data is not found", async () => {
      AppService.checkStatusSDID = jest.fn().mockResolvedValue(null);

      const response = await request(app).get("/ack/status/123");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Data not found");
    });

    it("should return 500 if an error occurs", async () => {
      AppService.checkStatusSDID = jest
        .fn()
        .mockRejectedValue(new Error("Internal error"));

      const response = await request(app).get("/ack/status/123");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("An error occurred");
    });
  });
});
