import User from "../model/user.js"
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
    const data = req.body
    if (!data) return res.json({ message: "No data received"})
    const { email, password } = data

    const user = await User.findOne({ where: { email: email }})
    if (!user) return res.status(401).json({ message: "Incorrect email or password"})

    const isAuthorised = await bcrypt.compare(password, user.password)
    if (!isAuthorised) return res.status(401).json({ message: "Incorrect email or password"})

    res.status(200).json({
        message: "Login succesful",
        status: "Success"
    })
}