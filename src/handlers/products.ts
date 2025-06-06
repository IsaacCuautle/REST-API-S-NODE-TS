import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  // Validacion
  await check("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto no debe estar vacio!")
    .run(req);
  
    await check("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .custom( value => value > 0)
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El nombre del producto no debe estar vacio!")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return
  }

  const product = await Product.create(req.body);
  res.json({ data: product });
};
