import Request from "supertest";

import server from "../server";

describe("GET /api", () => {
  test("should sent back a json response", async () => {
    const res = await Request(server).get("/api");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.text).toMatch("desde /api");

    expect(res.status).not.toBe(404);
    expect(res.text).not.toBe("desde api");
  });
});
