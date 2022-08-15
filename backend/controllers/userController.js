const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
//@desc register new user
//@route Post  /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('not valid input data');
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
        res.status(400);
        throw new Error('user is already created');
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hasedPassword });
    if (user) {
        res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

//@desc Authenticate a user
//@route Post  /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (userData && (await bcrypt.compare(password, userData.password))) {
        res.status(200).json({
            _id: userData.id, name: userData.name, email: userData.email, token: generateToken(userData._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

//@desc get user data
//@route Get  /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//Generate JWT
//sign a new token with that userId and expires in 30 days
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { registerUser, loginUser, getMe }