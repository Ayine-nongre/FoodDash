import nodemailer from'nodemailer'
import dotenv  from "dotenv"

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERNAM,
        pass: process.env.PASSWORD,
    },
})