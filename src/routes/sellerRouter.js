import express from 'express';
import { signup, signin } from '../controllers/sellerController.js';

const sellerRouter = express.Router();

sellerRouter.post('/signup', signup);
sellerRouter.post('/signin', signin);

export default sellerRouter;