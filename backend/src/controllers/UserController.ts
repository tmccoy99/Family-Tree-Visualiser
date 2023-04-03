import { Request, Response } from 'express';
import User from '../models/user';

interface IUserController {
  Create: (req: Request, res: Response) => Promise<void>;
}

const UserController: IUserController = {
  Create: async function (req, res) {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(201).json({ message: 'OK' });
  },
};

export default UserController;
