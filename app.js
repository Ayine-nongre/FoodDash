import express from 'express';
import bodyParser from 'body-parser';
import db from './config/db.js';
import { signup } from './controller/signup.js';
import { login } from './controller/login.js';
import { changePassword } from './controller/changePassword.js';
import { resetPassword, sendOTP, verifyOTP } from './controller/resetPassword.js';

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.post("/signup", signup)

app.post("/login", login)

app.put("/changePassword/", changePassword)

app.post("/sendOTP", sendOTP)

app.post("/verifyOTP/", verifyOTP)

app.post("/resetPassword/", resetPassword)

app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running succesfully")
})