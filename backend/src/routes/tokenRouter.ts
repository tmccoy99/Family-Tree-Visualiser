import express, { Router } from 'express';
import TokenController from '../controllers/TokenController';
const router: Router = express.Router();

router.post('/', TokenController.Create);

export default router;
