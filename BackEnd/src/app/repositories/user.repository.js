import mongoose from "mongoose";
import { CustomErrors } from "../../middlewares/errorHandlingMiddleware.js";
import { userSchema } from "../schemas/user.schema";

export class UserRepository {
  constructor() {
    this.userModel = mongoose.model("Users", userSchema);
  }
  getUser = async (email) => {
    try {
      const userData = await this.userModel.findOne({ email });
      if (!userData) {
        throw new CustomErrors("User not found!", 404);
      }
      return userData;
    } catch (error) {
      throw new CustomErrors("User Repository Get User Error", 500);
    }
  };
}
