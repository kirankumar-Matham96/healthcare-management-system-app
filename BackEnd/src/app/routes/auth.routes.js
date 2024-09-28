import express from "express";
import path from "path";
import { AuthControllers } from "../controllers/auth.controller.js";

export const authRoutes = express.Router();

const userController = new AuthControllers();

authRoutes.get("/signup", (req, res) => {
  res.sendFile(path.join(path.resolve(), "FrontEnd", "SignUp.html"));
});
authRoutes.post("/signup", userController.signUp);

authRoutes.get("/signin", (req, res) => {
  res.sendFile(path.join(path.resolve(), "FrontEnd", "SignIn.html"));
});
authRoutes.post("/signin", userController.signIn);
