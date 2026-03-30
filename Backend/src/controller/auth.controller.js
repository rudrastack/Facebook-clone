const UserModel = require('../models/auth.model')
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



async function registerController(req, res) {
    const { username, email, password, isPrivate, profilePicture, bio } = req.body
    const isUserAlreadyExist = await UserModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "user alreat exists" + (isUserAlreadyExist.email == email ? "email already exist" : "username already exist")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
        username,
        email,
        password: hash,
        isPrivate,
        profilePicture,
        bio
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })
   
    res.cookie("token", token)
        console.log(token)

    return res.status(201).json({
        message: "User Register Succesfullly", user: {
            username: user.username,
            email: user.email,
            isPrivate: user.isPrivate,
            bio: user.bio,
            profilePicture: user.profilePicture
        }
    })  
}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await UserModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(409).json({
            message: "user not found"
        })
    }



    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        return res.status(409).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    return res.status(200).json({
        message: "User Login Succesfully", user: {
            username: user.username,
            email: user.email,
            isPrivate: user.isPrivate,
            bio: user.bio,
            profilePicture: user.profilePicture

        }

    })
}

module.exports ={registerController, loginController}