
import jwt  from'jsonwebtoken'
import User  from '../models/User.js'


const jwtKey = "fuck you ! bitch"

const checkUser = (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send('You must Be logged in');

    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwtKey, async (err, payload) => {
        if (err) {
            return res.status(401).send(authorization);
        }

        const { id } = payload;
        const user = await User.findById(id)
        req.user = user;
        next();
    })

}


export default checkUser
