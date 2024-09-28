import { AuthRepository as AuthRepository } from "../repositories/auth.repository.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomErrors } from "../../middlewares/errorHandlingMiddleware.js";

export class AuthControllers {
  constructor() {
    this.authRepo = new AuthRepository();
  }

  signUp = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const encryptedPass = await bcrypt.hash(password, 12);

      const resp = await this.authRepo.signUp({
        name,
        email,
        password: encryptedPass,
      });

      res.status(201).json({ success: true, resp });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log("body => ", req.body);
      console.log("in controller => ", { email });
      const resp = await this.authRepo.signIn(email);

      const isValid = await bcrypt.compare(password, resp.password);

      if (!isValid) {
        throw new CustomErrors("Invalid Credentials", 401);
      }

      // create token
      const token = JWT.sign(
        {
          id: resp._id,
          email: resp.email,
        },
        process.env.SECRET,
        { expiresIn: "1 day" }
      );
      res.status(200).json({ success: true, token });
    } catch (error) {
      next(error);
    }
  };
}
