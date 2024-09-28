import { userSchema } from "../schemas/user.schema.js";
import { CustomErrors } from "../../middlewares/errorHandlingMiddleware.js";
import mongoose from "mongoose";

export class AuthRepository {
  constructor() {
    this.userModel = mongoose.model("Users", userSchema);
  }

  signUp = async (data) => {
    try {
      const newUser = await this.userModel(data);
      const resp = await newUser.save();
      return resp;
    } catch (error) {
      throw error;
    }
  };

  signIn = async (email) => {
    console.log({ email });
    try {
      const user = await this.userModel.findOne({ email });
      console.log({ user });
      if (!user) {
        throw new CustomErrors("User Not Found", 404);
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
}
