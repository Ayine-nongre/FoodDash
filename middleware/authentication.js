import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export const createToken = async (user, statusCode, res) => {
    const accessToken = jwt.sign({email : user.email}, process.env.TOKEN)
    res.cookie('Bearer', accessToken, {
        expires: new Date(
            Date.now() + 1 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    })
    res.status(statusCode).json({
        Message: "Token created successfully"
    })
}

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.Bearer
    console.log(token)
    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err){
            console.log(err)
            return res.status(401).json({
                message: "Unauthorised access"
            })
        }
        req.user = user
        next()
    })
}