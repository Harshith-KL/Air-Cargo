const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const connectDB = require("../src/config/db");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Health API", () => {
    test("GET /health should return healthy status", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("healthy");
    });
});

describe("Authentication API", () => {
  test("should reject invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/signin")
      .send({
        email: "klharshith01@gmail.com",
        password: "123456"
      });

    expect(response.statusCode).toBe(401);
  });
});