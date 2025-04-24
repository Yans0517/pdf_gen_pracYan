import request from 'supertest';
import {AppRouter} from '../routes/index.js'; // Your Express app

describe('YourController', () => {

  // Mock the AppService methods
  jest.mock('../services/index.js');
  const { AppService } = require('../services/index.js');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /ack', () => {
    it('should create new data and return a success message', async () => {
      // Arrange: Mock the data creation service
      const mockPayload = { sdid: '123', sid: 'Test', acknowledge: "Ack1" };
      AppService.createData = jest.fn().mockResolvedValue(mockPayload);

      const response = await request(AppRouter)
        .post('/ack')
        .send(mockPayload);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Data created successfully');
      expect(response.body.data).toEqual(mockPayload);
    });

  });

  describe('GET /ack/status/:sdid', () => {
    it('should return status data by ID', async () => {
      const mockData = { sdid: 'SDID1', sid: 'sid 1', acknowledge: "Ack1" };
      AppService.getStatus = jest.fn().mockResolvedValue(mockData);

      const response = await request(AppRouter)
        .get(`/ack/status/SDID1`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Data found");
      expect(response.body.data).toEqual(mockData);
    });

    it('should return 404 if data is not found', async () => {
      AppService.getStatus = jest.fn().mockRejectedValue(new Error('Data not found'));

      const response = await request(AppRouter)
        .get('/ack/status/123');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Data not found');
    });
  });
});
