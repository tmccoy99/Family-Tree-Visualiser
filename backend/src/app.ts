import express, { Express, Request, Response } from 'express';

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Started sever on port 3000');
});
export default app;
