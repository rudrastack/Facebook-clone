 const mongoose = require('mongoose')

    const postSchema = new mongoose.Schema({
      caption:{
        default:"",
        type:String
      },
      imgUrl:{
        type:String,
        required:[true, "imgUrl is required to create post"]
      },
      user:{
        ref:'users',
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "UserId is required for creating post"]
      }
    })

    const postModel = mongoose.model("fbPosts", postSchema)

    module.exports = postModel