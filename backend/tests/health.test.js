const request = require("supertest");
const app = require("../src/app");

describe("Health API", () => {
    test("GET /health should return healthy status", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("healthy");
    });
});