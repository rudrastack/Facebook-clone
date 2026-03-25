require('dotenv').config
const express = require('express')
const authrouter = require('express').Router()
const followController = require('../controller/follow.controller')

authrouter.post('/freind/:username',authController.registerController );

authrouter.delete('/freind/:usernmae',authController.loginController );

authrouter.get('/freind/requests',authController.loginController );

authrouter.patch('/freind/requests/:requestId',authController.loginController );






module.exports = authrouter;