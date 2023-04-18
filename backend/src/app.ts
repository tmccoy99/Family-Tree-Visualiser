import express, { Express, Request, Response } from 'express';
import { TokenPayload } from './controllers/TokenController';
import JWT, { Secret } from 'jsonwebtoken';
import tokenRouter from './routes/tokenRouter';
import userRouter from './routes/userRouter';
import memberRouter from './routes/memberRouter';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';

const app: Express = express();
dotenv.config();
app.use(logger('dev'));
app.use(cors());

async function tokenChecker(
  req: Request,
  res: Response,
  next: () => void
): Promise<void> {
  const authHeader: string | undefined = req.get('Authorization');
  const token: string = authHeader ? authHeader.slice(7) : '';
  try {
    const payload = await JWT.verify(token, process.env.JWT_SECRET as Secret);
    req.body.userID = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'auth error' });
  }
}

// Route so that e2e testing can reset db
app.use('/dbreset', async (req: Request, res: Response): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connection.dropDatabase();
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(403).json({ message: 'Cannot reset db out of test env' });
  }
});

app.use(express.json());
app.use('/tokens', tokenRouter);
app.use('/users', userRouter);
app.use('/members', tokenChecker, memberRouter);

export default app;
