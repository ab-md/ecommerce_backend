import "dotenv/config";
import express from "express";
// import dotenv from "dotenv";
import mongoose from "mongoose";
import { notFound, serverError } from "./src/common/middlewares/errorHandler.middlware.js";
import connectDB from "./src/config/database.config.js";
import { routes } from "./src/index.route.js";
import cookieParser from "cookie-parser";

const app = express();
// dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use(notFound);
app.use(serverError);

const port = process.env.PORT;
connectDB().then(() => {
    app.listen(port, err => console.log(err ? "err.message" : `Server is running on port: ${port}`));
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
})