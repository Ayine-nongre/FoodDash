import express from 'express';
import { makePayment } from '../controller/makePayment.js';
import { verifyToken } from '../middleware/authentication.js';

export const paymentRouter = express.Router();

paymentRouter.post("/payment", verifyToken, makePayment)