import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
  constructor() {
    this.userRepo = new UserRepository();
  }
  getUserById = async (req, res, next) => {
    try {
      const user = await this.userRepo.getUser(req.userId);
      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  };
}
