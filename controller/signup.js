import bcrypt from 'bcrypt'
import User from '../model/user.js'


export const signup = async (req, res) => {
    const data = req.body

    if (!data) return res.json( { message: "No data received from frontend" })

    const { name, email, password, confirmPassword } = data


    if (password != confirmPassword) return res.json( { message: "Passwords do not match" })

    const hashedPassword = await bcrypt.hash(password, 10)

    if (!hashedPassword) return res.status(500).json({ message: "Internal server error"})

    const checkUser = await User.findOne({ where : { email: email }})
    if (checkUser) return res.json( { message: "User with email " + email + " exists already" })

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    res.status(201).json({
        Username: name,
        Email: email,
        status: "Success"
    })
}