import express, { Express } from 'express';
import tokenRouter from './routes/tokenRouter';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import JWT, { Secret } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as Secret;
const app: Express = express();
dotenv.config();

app.use(express.json());
app.use('/tokens', tokenRouter);
app.use('/users', userRouter);

export default app;
