import { Router } from "express";
import { body, param } from "express-validator";

import {
  createProduct,
  getProducts,
  getProductsByID,
} from "./handlers/products";
import { handleInputErrors } from "./middleware";

const router = Router();

router.post(
  "/",
  // Validacion
  body("name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("El nombre del producto no debe estar vacio!"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .custom((value) => value > 0)
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El nombre del producto no debe estar vacio!"),

  // Middlewares
  handleInputErrors,
  createProduct
);

router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("El ID no valido"),
  handleInputErrors,
  getProductsByID
);

router.put("/", (req, res) => {
  res.json({
    message: "From the server put",
  });
});

router.patch("/", (req, res) => {
  res.json({
    message: "From the server patch",
  });
});

router.delete("/", (req, res) => {
  res.json({
    message: "From the server delete",
  });
});

export default router;
// This file defines the routes for the server.
