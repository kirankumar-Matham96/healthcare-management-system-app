import mongoose from "mongoose";
import { CustomErrors } from "../../middlewares/errorHandlingMiddleware.js";
import { userSchema } from "../schemas/user.schema.js";

export class UserRepository {
  constructor() {
    this.userModel = mongoose.model("Users", userSchema);
  }
  getUser = async (id) => {
    try {
      const userData = await this.userModel.findOne({ _id: id });
      if (!userData) {
        throw new CustomErrors("User not found!", 404);
      }
      return userData;
    } catch (error) {
      throw new CustomErrors("User Repository Get User Error", 500);
    }
  };
}
