import { Request, Response } from 'express';
import User from '../models/user';
import { generateToken } from './TokenController';

interface IUserController {
  Create: (req: Request, res: Response) => Promise<void>;
}

const UserController: IUserController = {
  Create: async function (req, res) {
    try {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      const token: string = generateToken(newUser.id);
      res.status(201).json({ token: token, message: 'OK' });
    } catch (err: any) {
      if (err.code === 11000) {
        res.status(409).json({ message: 'Duplicate email' });
      } else {
        res.status(500).json({ message: 'Unknown err' });
      }
    }
  },
};

export default UserController;
