import JWT, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
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

  Create: (req, res) => {
    res.status(401).json({ message: 'auth error' });
  },
};

export { TokenController as default, Payload };
