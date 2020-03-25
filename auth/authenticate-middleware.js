const jwt = require('jsonwebtoken');

const { jwtSecret } = require("../database/config/secrets.js");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const { id } = req.body
    const secret = jwtSecret;
    if(authorization){
        jwt.verify(authorization, secret, (err, decodedToken) => {
            if (err){
                res.status(401).json({ message: 'invalid credentials'})
            } else {
                req.decodedToken = decodedToken
                next();
            }
        })
    } else {
        res.status(400).json({ message: 'no credentials provided'})
    }
}


// user id valid
// ticket id valid
