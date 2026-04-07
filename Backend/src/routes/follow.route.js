require('dotenv').config
const express = require('express')
const followrouter = require('express').Router()
const followController = require('../controller/follow.controller')
const identifyUser = require('../middleware/auth.middleware')


// @route http://localhost:3000/api/followfb/freind/:username
followrouter.post('/freind/:username', identifyUser, followController.AddFreindController );


// @route http://localhost:3000/api/followfb/freind/:username
followrouter.delete('/freind/:username',identifyUser, followController.RemoveFreindController );


// @route http://localhost:3000/api/followfb/freind/requests
followrouter.get('/freind/requests',identifyUser, followController.getPendingRequest );



// @route http://localhost:3000/api/followfb/freind/requests/:requestId
followrouter.patch('/freind/requests/:requestId',identifyUser, followController.handleFollowRequest );


// @route http://localhost:3000/api/followfb/freind/stats
followrouter.get('/freind/stats', identifyUser, followController.getFollowStats)



module.exports = followrouter;