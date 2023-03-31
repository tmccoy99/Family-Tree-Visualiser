import JWT, { Secret } from 'jsonwebtoken';
const secret = process.env.JWT_SECRET as Secret;

interface ITokenMethods {
  generate: (userID: string) => string;
}

interface Payload {
  userID: string;
  iat: number;
  exp: number;
}

const TokenMethods: ITokenMethods = {
  generate: (userID) => {
    return JWT.sign(
      {
        userID: userID,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  },
};

export { TokenMethods as default, Payload };
