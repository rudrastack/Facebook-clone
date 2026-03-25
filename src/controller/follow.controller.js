require('dotenv').config
const UserModel = require('../models/auth.model')
const followModel = require('../models/follow.model')
const jwt = require('jsonwebtoken')


async function AddFreindController(req, res) {
    const followerUser = await UserModel.findById(req.user.id)
    const followingUser = await UserModel.findOne({
        username: req.params.username
    })

    if (!followingUser) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    if (followerUser._id.toString === followingUser._id.toString) {
        return res.status(401).json({
            message: "you can't follow yourself"
        })
    }

    const isAlreadyexist = await followModel.findOne({
        follower: followerUser._id,
        following: followingUser._id
    })

    if (isAlreadyexist) {
        return res.status(400).json({
            message: "Already Requsted/Following"
        })
    }
    const status = followingUser.isPrivate ? "Pending" : "Accepted"

    const follow = await followModel.create({
        follower: followerUser._id,
        following: followingUser._id,
        status
    })
    return res.status(200).json({
        message: status==="pending"? "follow request sent" : "followed successfully",
        follow
    })
}
async function RemoveFreindController(req, res) {
    const followerUser = await UserModel.findById(req.user.id)
    const followingUser = await UserModel.findOne({ username: req.params.username})

    const follow = await followModel.findOne({
        follower: followerUser._id,
        following: followingUser._id,
        status:"Accepted"
    })
    if(!follow){
        return res.status(400).json({
            message:`you are following ${req.params.username}`
        })
    }
    await followModel.deleteOne({_id:follow._id})
   
    return res.status(200).json({
        message: "Unfollowed successfully",
        
    })
}
async function getPendingRequest(req, res) {
    const user = await UserModel.findOne({username:req.user.username})

    const requests = await followModel.find({
        follower:user._id,
        status:"Pending",     
    }).populate("follower", "username")
    
    res.json({requests})
}








module.exports ={
    AddFreindController ,RemoveFreindController, getPendingRequest
}
