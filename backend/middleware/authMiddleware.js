const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //token comes in headers authorization and starts with Bearer 1245763h(basically token)
            token = req.headers.authorization.split(' ')[1];
            //verifiying it with  jwt package internal verify method with our own jwt secrect what is present in node env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user from token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

module.exports = { protect }