import express, { Router } from 'express';
import TokenController from '../models/TokenController';
const router: Router = express.Router();

router.post('/', TokenController.Create);

export default router;
