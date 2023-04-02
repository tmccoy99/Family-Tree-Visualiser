import express, { Express, Request, Response } from 'express';
import tokenRouter from './routes/tokenRouter';
import dotenv from 'dotenv';
const app: Express = express();
dotenv.config();
app.use(express.json());
app.use('/tokens', tokenRouter);

export default app;
