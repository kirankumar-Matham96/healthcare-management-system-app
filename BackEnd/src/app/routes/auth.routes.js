import express from "express";
import { AuthControllers } from "../controllers/auth.controller.js";

export const authRoutes = express.Router();

const userController = new AuthControllers();

authRoutes.post("/signup", userController.signUp);
authRoutes.post("/signin", userController.signIn);
