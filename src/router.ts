import { Router } from "express";
import { body } from "express-validator";

import { createProduct } from "./handlers/products";
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

router.get("/", (req, res) => {
  res.json({
    message: "From the server post",
  });
});

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
