import { NextFunction, Request, Response } from "express";

import Product from "../models/Product.model";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(`\nOcurrio un error: ${error}\n`);
  }
};

const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.findAll({
      limit: 5,
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });
    res.json({
      data: products,
    });
  } catch (error) {
    console.log(`\nOcurrio un error: ${error}\n`);
  }
};

const getProductsByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });

    if (!product) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json({
      data: product,
    });
  } catch (error) {
    console.log(`\nOcurrio un error: ${error}\n`);
  }
};

export { createProduct, getProducts, getProductsByID };
