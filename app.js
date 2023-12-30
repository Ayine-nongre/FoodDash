import express from 'express';
import bodyParser from 'body-parser';
import db from './config/db.js';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/authRoutes.js';
import filterRouter from './routes/filterRoutes.js';
import { paymentRouter } from './routes/paymentRoutes.js';

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.use("/api", authRouter)
app.use("/api", filterRouter)
app.use("/api", paymentRouter)

app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running succesfully")
})
