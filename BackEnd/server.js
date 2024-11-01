import "dotenv/config";
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import path from "path";

import { connectToDB } from "./config/config.js";
import { authRoutes } from "./src/app/routes/auth.routes.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandlingMiddleware.js";
import { userRouter } from "./src/app/routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});
app.use(limiter);

const publicPath = path.resolve("FrontEnd");
app.use(express.static(publicPath));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);

app.use(errorHandlingMiddleware);

app.listen(3000, (req, res) => {
  console.log("Server started and running at 3000");
  connectToDB();
});
