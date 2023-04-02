import JWT, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
const secret = process.env.JWT_SECRET as Secret;

interface ITokenController {
  generateToken: (userID: string) => string;
  Create: (req: Request, res: Response) => void;
}

interface Payload {
  userID: string;
  iat: number;
  exp: number;
}

const TokenController: ITokenController = {
  generateToken: (userID) => {
    return JWT.sign(
      {
        userID: userID,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  },

  Create: async function (req, res) {
    const user: IUser | null = await User.findOne({ email: req.body.email });
    if (user) {
      const token = TokenController.generateToken(user.id);
      res.status(201).json({ token: token, message: 'OK', userID: user.id });
    } else {
      res.status(401).json({ message: 'auth error' });
    }
  },
};

export { TokenController as default, Payload };
