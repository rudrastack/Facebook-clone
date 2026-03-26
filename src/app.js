require('dotenv').config
const express = require('express')  
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.route.js');
const followRoutes = require('./routes/follow.route.js')


const app = express()
app.use(express.json())
app.use(cookieParser());
app.use('/api/authfb', authRoutes);   
app.use('/api/followfb', followRoutes);   








module.exports = app
