import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { connectToDB } from "./config/config.js";

import { authRoutes } from "./src/app/routes/auth.routes.js";
import { webRoutes } from "./src/app/routes/web.routes.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandlingMiddleware.js";
import { userRouter } from "./src/app/routes/users.routes.js";

const app = express();

// const currentPath = path.join(path.resolve(), "FrontEnd");
const publicPath = path.resolve("FrontEnd");
console.log(publicPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(express.static(currentPath));
app.use(express.static(publicPath));

app.use("/healthcare/api/auth", authRoutes);
app.use("/healthcare/api/users", userRouter);
app.use("/healthcare/api", webRoutes);

app.use(errorHandlingMiddleware);

app.listen(3000, (req, res) => {
  console.log("Server started and running at 3000");
  connectToDB();
});
