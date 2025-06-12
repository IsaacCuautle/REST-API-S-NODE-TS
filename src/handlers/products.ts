import { NextFunction, Request, Response } from "express";

import Product from "../models/Product.model";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(`\nOcurrio un error: ${error}\n`);
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll({
      limit: 5,
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });
    
    res.status(200).json({
      data: products,
    });
    
  } catch (error) {
    console.log(`\nOcurrio un error: ${error}\n`);
  }
};

const getProductsByID = async (req: Request, res: Response): Promise<void> => {
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

    res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(`\nOcurrio un error: ${error}\n`);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
  }

  // Actualizar
  await product.update(req.body);
  await product.save();

  res.status(200).json({
    data: product,
  });
};

const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
  }

  // Actualizar
  product.availability = !product.dataValues.availability;
  await product.save();

  res.status(200).json({
    data: product,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
  }

  // Eliminar
  await product.destroy();

  res.status(200).json({
    data: product,
  });
};

export {
  createProduct,
  getProducts,
  getProductsByID,
  updateProduct,
  updateAvailability,
  deleteProduct,
};
