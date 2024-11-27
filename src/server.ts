import dotenv from "dotenv";
import app from "./config/app.express";
import connectDB from "./config/db";
import e, { json } from "express";
import RootRouter from "./routes/root.router";

// dotenv initialization
dotenv.config();

// connect to mongodatabase!
connectDB();

app.use(json());

// route configs
app.use("/api", RootRouter);

const PORT = process.env.PORT || 5000;

// global error middleware
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    message: err.message,
    success: false,
    error: err,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// app server start!
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
