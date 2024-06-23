import request from "supertest";
import app from "../src/routes";

describe("Test app", () => {
  test("Catch-all routes", async () => {
    const res = await request(app).get("/").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Pong!");
  });
});