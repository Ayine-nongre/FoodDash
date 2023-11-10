import { transporter } from '../config/mailTransporter.js'
import { otp } from '../model/otp.js'
import { User } from '../model/user.js'
import bcrypt from 'bcrypt'


export function generateOTP (){
    const strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var OTP = ""

    for (let i = 0; i < 4; i++){
        OTP += strings[Math.floor(Math.random() * 10) % strings.length]
    }

    return OTP
} 

export const sendOTP = async (req, res) => {
    const data = req.body
    if (!data) return res.json({ message: "No data received"})
    const { email } = data

    const user = await User.findOne({ where: { email: email }})
    if (!user) return res.json({ message: "This email is not registered to foodDash"})

    const OTP = generateOTP()

    await transporter.sendMail({
        from: '"FoodDash" <eugeneatinbire@gmail.com>',
        to: ' <' + email + '>',
        subject: "Reset Password",
        html: "<div><p>Hi " + user.username + ",</p><p>Your OTP is: " + OTP +"</p></div>"
    }).catch(err => console.log(err))

    const hashedOTP = await bcrypt.hash(OTP, 10)
    if (!hashedOTP) return res.status(500).json({ message: "Internal server error"})

    const savedOTP = await otp.create({
        passcode: hashedOTP,
        user_id: user.id
    })
    if (!savedOTP) return res.status(500).json({ message: "Internal server error"})

    res.status(201).json({
        email: email,
        message: "OTP delivered",
        status: "success"
    })
}

export const verifyOTP = async (req, res) => {
    const data = req.body
    if (!data) return res.json({ message: "No data received"})
    const { OTP } = data

    const user = await User.findOne({ where: { email: req.query.user_email }})
    if (!user) return res.status(404).json({ message: "This email is not registered to foodDash" })

    const userOTP = await otp.findOne({ where: { user_id: user.id }})
    if (!userOTP) return res.status(500).json({ message: "Internal server error" })

    var date = new Date(userOTP.createdAt);
    var expiry = date.getTime() + 300000 //5 minutes in milliseconds is 300000
    
    if (Date.now() >= expiry){
        await userOTP.destroy().catch(err => console.log(err))
        return res.status(401).json({ message: "The OTP has expired" })
    }

    const isAuthorised = await bcrypt.compare(OTP, userOTP.passcode)
    if (!isAuthorised) return res.status(401).json({ message: "Incorrect OTP" })

    await userOTP.destroy().catch(err => console.log(err))

    res.status(200).json({
        message: "OTP succesful",
        status: "Success"
    })
}

export const resetPassword = async (req, res) => {
    const data = req.body
    if (!data) return res.json( { message: "No data received from frontend" })
    const { password, confirmPassword } = data

    if (password != confirmPassword) return res.json( { message: "Passwords do not match" })
    const hashedPassword = await bcrypt.hash(password, 10)
    if (!hashedPassword) return res.status(500).json({ message: "Internal server error"})

    const user = await User.findOne({ where: { email: req.query.user_email }})
    if (!user) return res.status(404).json({ message: "Internal server error" })

    await user.update({ password: hashedPassword }).catch(err => console.log(err))
    await user.save().catch(err => console.log(err))

    res.status(200).json({
        message: "Password resetted succesful",
        status: "Success"
    })
}