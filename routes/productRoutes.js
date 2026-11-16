import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// READ: Display all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.render("product", { products });
    } catch (error) {
        res.status(500).send("Error fetching products");
    }
});

// CREATE: Display add-product form
router.get("/add", (req, res) => {
    res.render("productForm");
});

// CREATE: Save a new product
router.post("/add", async (req, res) => {
    try {
        await Product.create(req.body);
        res.redirect("/products");
    } catch (error) {
        res.status(400).send("Error creating product");
    }
});

// READ: Display the edit form
router.get("/edit/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render("editProduct", { product });
    } catch (error) {
        res.status(400).send("Invalid product ID");
    }
});

// UPDATE: Update an existing product using PUT
router.put("/update/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.redirect("/products");
    } catch (error) {
        res.status(400).send("Error updating product");
    }
});

// DELETE: Delete a product using DELETE
router.delete("/delete/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.redirect("/products");
    } catch (error) {
        res.status(400).send("Error deleting product");
    }
});

export default router;