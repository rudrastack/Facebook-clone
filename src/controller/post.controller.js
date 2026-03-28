const postModel = require('../models/post.model')
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

module.exports = {
    createPostController,
    getpostController,
    getpostDetailsController
}