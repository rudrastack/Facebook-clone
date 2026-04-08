const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')
const followModel = require('../models/follow.model')
const ImageKit = require('imagekit');


const imagekit = new ImageKit({

    privateKey: process.env.IMAGE_PRIVATE_KEY,
    publicKey: process.env.IMAGE_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGE_URL_ENDPOINT
})

async function createPostController(req, res) {

    const file = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: Date.now() + ".jpg",
        folder: "Facebook-collection"
    })

    const post = await postModel.create({
        user: req.user.id,
        imgUrl: file.url,
        caption: req.body.caption
    })
    return res.status(201).json({
        message: "post created succesfully",
        post
    })
}

async function getpostController(req, res) {
    const userId = req.user.id

    const post = await postModel.findOne({
        user: userId
    })
    return res.status(201).json({
        message: "Post fected succesfully",
        post
    })
}

async function getpostDetailsController(req, res) {

    userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post not found"
        })
    }

    //ObjectId("abc123") !== "abc123" that why we used toString() 
    const isValidUser = post.user.toString() === userId // "kya ye post usi bande ki hai jo request kar raha hai?"
    //  which is called authorization 

    if (!isValidUser) {
        return res.status(403).json({
            message: 'foridden content'
        })
    }

    return res.status(200).json({
        message: 'post details fetched succesfully', post
    })
}

async function postlikeController(req, res) {
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const alreadyLiked = await likeModel.findOne({
        user: userId,
        post: postId
    })

    if (alreadyLiked) {
        return res.status(400).json({
            message: "You already liked this post"
        })
    }

    const like = await likeModel.create({
        user: userId,
        post: postId
    })

    return res.status(200).json({
        message: "Post liked successfully",
        like
    })
}

async function postunlikeController(req, res) {
    const userId = req.user.id
    const postId = req.params.postId

    const isUserliked = await likeModel.findOne({
        user: userId,
        post: postId
    })

    if (!isUserliked) {
        return res.status(400).json({
            message: "You have not liked this post"
        })
    }

    await likeModel.deleteOne({ _id: isUserliked._id })

    return res.status(200).json({
        message: "Post unliked successfully"
    })
}




async function getFeedController(req, res) {

    const userId = req.user.id

    const posts = await Promise.all(
        (await postModel.find({}).sort({ _id: -1 }).populate("user").lean())
            .map(async (post) => {

                const isLiked = await likeModel.findOne({
                    user: userId,
                    post: post._id
                })

                post.isLiked = Boolean(isLiked)


                //  Check if YOU sent request / follow
                const follow = await followModel.findOne({
                    follower: userId,
                    following: post.user._id
                })

                // Check if THEY sent you request
                const incoming = await followModel.findOne({
                    follower: post.user._id,
                    following: userId,
                    status: "pending"
                })

                let followStatus = "none"
                let requestId = null

                if (follow) {
                    followStatus = follow.status   // pending / accepted
                    requestId = follow._id
                }

                // overwrite if incoming request exists
                if (incoming) {
                    followStatus = "incoming"
                    requestId = incoming._id
                }

                post.followStatus = followStatus
                post.requestId = requestId


                return post
            })
    )

    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}

module.exports = {
    createPostController,
    getpostController,
    getpostDetailsController,
    postlikeController,
    postunlikeController,
    getFeedController
}