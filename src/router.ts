import { Router } from "express";

import { createProduct } from "./handlers/products";

const router = Router();

router.post("/", createProduct);

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