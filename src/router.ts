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

const router = Router();

/** 
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *         type: integer
 *         description: The Product ID
 *         example: 1
 *        name:
 *         type: string
 *         description: The Product Name
 *         example: Nuka cola 600ml
 *        price:
 *         type: float
 *         description: The Product Price
 *         example: 6.50
 *        availability:
 *         type: boolean
 *         description: The Product Availability
 *         example: true
 * 
*/


/** 
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a List of Products
 *    tags:
 *      - Products
 *    description:
 *      Return a list of Products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 * 
*/

router.get("/", getProducts);

/**
  * @swagger
  * /api/products/{id}:
  *  get:
  *     summary: Get a product by ID
  *     tags:
  *       - Products
  *     description: Return a product based on its unique ID
  *     parameters:
  *     - in: path
  *       name: id
  *       description: The ID of the Product to retrive
  *       required: true
  *       schema:
  *         type: integer
  *     responses:
  *       200:
  *         description: Successful response
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Product'
  * 
  *       404:
  *         description: Not found product
  * 
  *       400:
  *         description: Bad request invalid ID
*/

router.get(
  "/:id",
  param("id").isInt().withMessage("El ID no valido"),
  handleInputErrors,
  getProductsByID
);

/**
  * @swagger
  * /api/products:
  *   post:
  *     summary: Creates a product
  *     tags:
  *       - Products
  *     description: Returns a new record in the database
  *     requestBody: 
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               name:
  *                 type: string
  *                 example: nuka cola 600ml
  *               price:
  *                 type: number
  *                 example: 3.99
  *     responses:
  *       201:
  *         description: Product created succesfully
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Product'
  *       400:
  *         description: Bed request - invalid input data
*/        

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


/**
  * @swagger
  * /api/products/{id}:
  *   put:
  *     summary: Updates a product with user input
  *     tags: 
  *       - Products
  *     description: Returns the updated product
  *     parameters:
  *     - in: path
  *       name: id
  *       description: The ID of the Product to update
  *       required: true
  *       schema:
  *         type: integer
  *     requestBody: 
  *           required: true
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   name:
  *                     type: string
  *                     example: nuka cola 600ml
  *                   price:
  *                     type: number
  *                     example: 3.99
  *                   availability:
  *                     type: boolean
  *                     example: true
  *     responses:
  *       200:
  *         description: Product updated succesfully
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Product'
  *       400:
  *         description: Bed request - Invalid id or invalid data
  *       404:
  *         description: Product not found
*/

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


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *     - in: path
 *       name: id
 *       description: The ID of the product to update
 *       required: true
 *       schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
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
