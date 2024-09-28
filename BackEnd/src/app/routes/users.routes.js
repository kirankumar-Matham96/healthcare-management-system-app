import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authorized } from "../../middlewares/authorized.middleware.js";

export const userRouter = Router();

const userController = new UserController();

userRouter.get("/userbyemail", authorized, userController.getUserByEmail);
