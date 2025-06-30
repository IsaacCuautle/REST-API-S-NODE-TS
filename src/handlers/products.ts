import { NextFunction, Request, Response } from "express";

import Product from "../models/Product.model";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await Product.findAll({
    limit: 5,
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
  });

  res.status(200).json({
    data: products,
  });
};



const getProductsByID = async (req: Request, res: Response): Promise<void> => {
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

  res.status(200).json(
    'Producto eliminado correctamente'
  );
};

export {
  createProduct,
  getProducts,
  getProductsByID,
  updateProduct,
  updateAvailability,
  deleteProduct,
};
