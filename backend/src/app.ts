import express, { Express } from 'express';
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

// Route so that e2e testing can reset db
app.use('/dbreset', async (req, res) => {
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
app.use('/members', memberRouter);

export default app;
