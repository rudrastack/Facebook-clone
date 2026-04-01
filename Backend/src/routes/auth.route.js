require('dotenv').config
const express = require('express')
const authrouter = require('express').Router()
const authController =require('../controller/auth.controller')
const identifyUser = require('../middleware/auth.middleware')

// @route http://localhost:3000/api/authfb/register

authrouter.post('/register', authController.registerController );

//  @route http://localhost:3000/api/authfb/login

authrouter.post('/login', authController.loginController );

//  @route http://localhost:3000/api/authfb/login
authrouter.get('/get-me', identifyUser, authController.getMeController );





module.exports = authrouter;