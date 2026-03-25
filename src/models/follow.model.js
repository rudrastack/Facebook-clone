const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fbusers'
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fbusers'
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }

}, {timestamps:true})

followSchema.index({follower:1, following:1}, {unique:true})

const followModel = mongoose.model("fbfollows", followSchema)
module.exports = followModel