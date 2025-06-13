import Request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await Request(server).post("/api/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(201);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should create a new product", async () => {
    const response = await Request(server).post("/api/products").send({
      name: "Nukakola - Testing",
      price: 201,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });

  it("should valite the price is not 0", async () => {
    const response = await Request(server).post("/api/products").send({
      name: "nukacola - testing",
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });
});
