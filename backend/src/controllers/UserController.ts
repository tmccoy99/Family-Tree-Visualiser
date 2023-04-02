import { Request, Response } from 'express';

interface IUserController {
  Create: (req: Request, res: Response) => void;
}

const UserController: IUserController = {
  Create: function (req, res) {
    res.status(201).json({ message: 'OK' });
  },
};

export default UserController;
