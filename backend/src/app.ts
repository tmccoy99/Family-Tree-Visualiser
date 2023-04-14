import express, { Express } from 'express';
import tokenRouter from './routes/tokenRouter';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';

const app: Express = express();
dotenv.config();
app.use(logger('dev'));
app.use(cors());
app.use('/dbreset', (req, res) => {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connection.dropDatabase();
    res.status(200).json({ message: 'OK' });
  } else {
    console.log(process.env.NODE_ENV?.length);
    res.status(403).json({ message: 'Cannot reset db out of test env' });
  }
});

app.use(express.json());
app.use('/tokens', tokenRouter);
app.use('/users', userRouter);

export default app;
