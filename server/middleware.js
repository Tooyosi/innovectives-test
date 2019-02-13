let jwt = require('jsonwebtoken');

const config = require("./config.js");
var middleware = {};


middleware.checkToken = (req, res, next) => {
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

middleware.supportedType = (req, res, next) => {
    if(fileProperties.supported){
        next()
    }else{
        fileProperties.supportMessage = "file not supported"
        next()
    }
}

module.exports = middleware;