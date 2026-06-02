const jwt = require('jsonwebtoken');
const response = require('../helpers/response');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json(response(401, 'Token tidak ditemukan'));
    }

    console.log('AUTH:', authHeader);
    
    const token = authHeader.split(' ')[1];


    try {

        console.log('TOKEN', token);

        const decoded = jwt.verify(
            token,
            process.env.AUTH_SECRET
        );

        req.user = decoded;

        next();

    } catch(error) {
        console.log(error.message);

        return res.status(401).json(response(401, 'Token tidak valid'));
    }
};

module.exports = verifyToken;