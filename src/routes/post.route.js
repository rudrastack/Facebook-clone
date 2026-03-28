const express = require("express")
const PostController = require('../controller/post.controller')
const postrouter = require('express').Router()
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser  = require('../middleware/auth.middleware')

postrouter.post("/", upload.single("image"), identifyUser, PostController.createPostController)
postrouter.get("/",identifyUser, PostController.getpostController)
postrouter.get("/details/:postId", identifyUser, PostController.getpostDetailsController)

module.exports = postrouter