import server, { connectToDatabase } from "../server";
import db from "../config/db";


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
