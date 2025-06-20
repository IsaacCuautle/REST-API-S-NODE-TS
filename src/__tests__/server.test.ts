import Request from "supertest";
import server, { connectToDatabase } from "../server";
import db from "../config/db";

describe("GET /api", () => {
  it("Should sent back a json response", async () => {
    const res = await Request(server).get("/api");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.text).toMatch("desde /api");

    expect(res.status).not.toBe(404);
    expect(res.text).not.toBe("desde api");
  });
});

jest.mock("../config/db");

describe("Connect DB", () => {
  it("Should handle database conection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Unable to connect to the database"));

    const consoleSpy = jest.spyOn(console, "log");
    await connectToDatabase();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unable to connect to the database")
    );
  });
});
