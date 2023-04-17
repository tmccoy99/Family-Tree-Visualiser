import express, { Router } from 'express';
import FamilyController from '../controllers/FamilyController';

const router: Router = express.Router();
router.post('/', FamilyController.Create);

export default router;
