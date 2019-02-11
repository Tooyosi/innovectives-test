let jwt = require('jsonwebtoken');

const config = require("./config.js");

let checkToken = (req, res, next) => {
        console.log(req.body)
        console.log(req.headers)
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token.startsWith('Bearer')){
        // Remove bearer from string
        token = token.slice(7, token.length);
    }

    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}