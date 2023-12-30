import express from 'express';
import { signup } from '../controller/signup.js';
import { login } from '../controller/login.js';
import { changePassword } from '../controller/changePassword.js';
import { resetPassword, sendOTP, verifyOTP } from '../controller/resetPassword.js';
import { verifyToken } from '../middleware/authentication.js';

export const authRouter = express.Router();

authRouter.post("/signup", signup)

authRouter.post("/login", login)

authRouter.put("/changePassword", verifyToken, changePassword)

authRouter.post("/sendOTP", sendOTP)

authRouter.post("/verifyOTP/", verifyOTP)

authRouter.post("/resetPassword/", resetPassword)

