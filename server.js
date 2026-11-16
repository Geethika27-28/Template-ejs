import express from "express";
import methodOverride from "method-override";
import connectDB from "./db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/products", productRoutes);

const startServer = async () => {
    await connectDB();

    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
};

startServer();