import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-router.js";
import adminRouter from "./routes/admin-router.js";
import movieRouter from "./routes/movie-router.js";
import bookingsRouter from "./routes/booking-router.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route middleware
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// Database connection
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE,MONGO_PORT } = process.env;

if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_DATABASE) {
  console.error("Missing MongoDB connection information");
  process.exit(1); // Exit the process with an error code
}
const PORT =MONGO_PORT||5000
mongoose
  .connect(
    `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.hbkqtqv.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connected To Database And Server is running ${MONGO_PORT}` )
    )
  )
  .catch((e) => console.error("MongoDB connection error:", e));
