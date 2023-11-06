import express from 'express';
import bodyParser from 'body-parser';
import db from './config/db.js';
import { signup } from './controller/signup.js';

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

app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running succesfully")
})