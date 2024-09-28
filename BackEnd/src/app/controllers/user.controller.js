import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
  constructor() {
    this.userRepo = new UserRepository();
  }
  getUserByEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await this.userRepo.getUser(email);
      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  };
}
