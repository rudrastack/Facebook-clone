const jwt = require('jsonwebtoken')
const UserModel = require('../models/auth.model')
const followModel = require('../models/follow.model')


async function AddFreindController(req, res) {

    const followerUser = await UserModel.findById(req.user.id)
    const followingUser = await UserModel.findOne({
        username: req.params.username
    })

    const isAlreadyexist = await followModel.findOne({
        follower: followerUser._id,
        following: followingUser._id
    })


   if (isAlreadyexist) {

    if (isAlreadyexist.status === "pending") {
        return res.status(400).json({
            message: "Request Already Sent"
        })
    }

    if (isAlreadyexist.status === "accepted") {
        return res.status(400).json({
            message: "Already Following"
        })
    }

    if (isAlreadyexist.status === "rejected") {
        await followModel.deleteOne({ _id: isAlreadyexist._id })
    }
}

    if (followerUser._id.toString() === followingUser._id.toString()) {
        return res.status(400).json({
            message: "you can't follow yourself"
        })
    }


    if (!followingUser) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const status = followingUser.isPrivate ? "pending" : "accepted"

    const follow = await followModel.create({
        follower: followerUser._id,
        following: followingUser._id,
        status
    })
    return res.status(200).json({
        message: status === "pending" ? "follow request sent" : "followed successfully",
        follow
    })
}

async function RemoveFreindController(req, res) {
    const followerUser = await UserModel.findById(req.user.id)
    const followingUser = await UserModel.findOne({ username: req.params.username })

    const follow = await followModel.findOne({
        follower: followerUser._id,
        following: followingUser._id,
        status: "accepted"
    })
    if (!follow) {
        return res.status(400).json({
            message: `you are not following ${req.params.username}`
        })
    }
    await followModel.deleteOne({ _id: follow._id })

    return res.status(200).json({
        message: "Unfollowed successfully",

    })
}

async function getPendingRequest(req, res) {
    const user = await UserModel.findOne({ username: req.user.username })

    const requests = await followModel.find({
        follower: user._id,
        status: "pending",
    }).populate("follower", "username")

    res.json({ requests })
}

async function handleFollowRequest(req, res) {
    const { status } = req.body
    const requestId = req.params.requestId
    if (!["accepted", "rejected"].includes(status)) {
        res.status(401).json({
            message: "Invalid Status"
        })
    }
    const request = await followModel.findById(requestId)
    if (!request) {
        res.status(404).json({ message: "request not found" })
    }

    const user = await UserModel.findOne({ username: req.user.username })

    if (request.following.toString() !== user._id.toString()) {
        return res.status(403).json({
            message: "Not Authorized"
        })
    }
    request.status = status
    await request.save()

    return res.json({ message: `Request ${status}` })
}



module.exports = {
    AddFreindController,
    RemoveFreindController,
    getPendingRequest,
    handleFollowRequest
}
