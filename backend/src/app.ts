import express, { Express, Request, Response } from 'express';
import tokenRouter from './routes/tokenRouter';
const app: Express = express();

app.use(express.json());
app.use('/tokens', tokenRouter);

export default app;
