require('dotenv').config
const express = require('express')  
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.route.js');
const followRoutes = require('./routes/follow.route.js')
const postRoutes = require('./routes/post.route.js')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "https://facebook-clone-3vpt.onrender.com" }))
app.use('/api/authfb', authRoutes);   
app.use('/api/followfb', followRoutes);   
app.use('/api/postfb',postRoutes );   








module.exports = app
