const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fbPosts',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fbusers',
        required: true
    }

}, { timestamps: true })

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("fblikes", likeSchema)
module.exports = likeModel