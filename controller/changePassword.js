import { User } from "../model/user.js"
import bcrypt from 'bcrypt'

export const changePassword = async (req, res) => {
    const data = req.body
    const usermail = req.user.email
    console.log(usermail)
    if (!data) return res.json({ message: "No data received"})
    const { current_password, new_password, confirm_password } = data

    if (new_password != confirm_password) res.status(401).json({ message: "New password do not match confirmation" })

    const user = await User.findOne({ where: { email: usermail }})
    if (!user) return res.status(404).json({ message: "This email is not registered to foodDash" })

    const isAuthorised = await bcrypt.compare(current_password, user.password)
    if (!isAuthorised) return res.status(401).json({ message: "Incorrect password" })

    const hashedPassword = await bcrypt.hash(new_password, 10)
    if (!hashedPassword) return res.status(500).json({ message: "Internal server error"})
    await user.update({ password: hashedPassword }).catch(err => console.log(err))
    await user.save().catch(err => console.log(err))

    res.status(200).json({
        message: "Password changed succesful",
        status: "Success"
    })
}