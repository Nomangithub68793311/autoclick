const jwt = require('jsonwebtoken');
const User = require('../database/models/User')
const Admin = require('../database/models/Admin')

const jwtKey = process.env.JWT_KEY
const checkAdmin = (req, res, next) => {

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
        const user = await Login.findById(id)
        req.user = user;

        console.log(req.user)
        next();
    })

}


export default checkAdmin


