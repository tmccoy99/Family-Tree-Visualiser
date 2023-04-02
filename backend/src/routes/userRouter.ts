import app from '../app';
import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
router.post('/', UserController.Create);

export default router;
