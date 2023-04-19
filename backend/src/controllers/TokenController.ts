import JWT, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

interface ITokenController {
  Create: (req: Request, res: Response) => void;
}

interface TokenPayload {
  userID: string;
  iat: number;
  exp: number;
}

function generateToken(userID: string): string {
  return JWT.sign(
    {
      userID: userID,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    process.env.JWT_SECRET as Secret
  );
}

const TokenController: ITokenController = {
  Create: async function (req, res) {
    const user: IUser | null = await User.findOne({ email: req.body.email });
    if (!user || !(await user.validatePassword(req.body.password))) {
      res.status(401).json({ message: 'auth error' });
    } else {
      const token = generateToken(user.id);
      res.status(201).json({ token: token, message: 'OK' });
    }
  },
};

export { TokenController as default, TokenPayload, generateToken };
