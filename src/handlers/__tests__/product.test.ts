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

describe("GET /api/products", () => {
  it("Should check if api/proiducts url exist", async () => {
    const response = await Request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });

  it("GET a JSON response with products", async () => {
    const response = await Request(server).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products:id", () => {
  it("Should return a 404 for a non-exist product", async () => {
    const product = 2000;
    const response = await Request(server).get(`/api/products/${product}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });

  it("Should check a valid ID in the URL", async () => {
    const response = await Request(server).get("/api/products/not-valid-url");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("El ID no valido");
  });

  it("get a JSON response for a single product", async () => {
    const response = await Request(server).get("/api/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});
