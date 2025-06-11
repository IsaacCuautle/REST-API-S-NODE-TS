import { Router } from "express";
import { body, param } from "express-validator";

import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByID,
  updateAvailability,
  updateProduct,
} from "./handlers/products";
import { handleInputErrors } from "./middleware";
import Product from "./models/Product.model";

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

router.put(
  "/:id",
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
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  param("id").isInt().withMessage("El ID no valido"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("El ID no valido"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("El ID no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
// This file defines the routes for the server.
