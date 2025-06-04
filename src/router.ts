import { Router } from "express";


const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "From the server GET",
    });
});

router.post("/", (req, res) => {
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