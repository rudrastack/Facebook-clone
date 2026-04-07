// import { getFeed, createPost, likePost, unLikePost } from "../services/post.api"
// import { useContext, useEffect } from "react"
// import { PostContext } from "../post.context.jsx"

// export const usePost = () => {

//     const context = useContext(PostContext)

//     const {  loading, setLoading, post, setPost, feed, setFeed } = context

//     const handleGetFeed = async () => {
//         setLoading(true)
//         const data = await getFeed()
//         setFeed(data.posts.reverse())
//         setLoading(false)
//     }

//     const handleCreatePost = async (imageFile, caption) => {
//         setLoading(true)
//         const data = await createPost(imageFile, caption)
//         setFeed([ data.post, ...feed ])
//         setLoading(false)
//     }

//     const handleLike = async (post) => {

//         const data = await likePost(post)
//         await handleGetFeed()

//     }
//     const handleUnLike = async (post) => {

//         const data = await unLikePost(post)
//         await handleGetFeed()

//     }

//     useEffect(() => {
//         handleGetFeed()
//     }, [])

//     return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike }

// }

import { useState } from "react"
import { getFeed, likePost, unLikePost, createPost } from "../services/post.api"

export const usePost = () => {

  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(false)

  // 🔥 GET FEED
  const handleGetFeed = async () => {
    setLoading(true)
    const res = await getFeed()
    setFeed(res.posts)
    setLoading(false)
  }

  // 🔥 CREATE POST
  const handleCreatePost = async (imageFile, caption) => {
    const res = await createPost(imageFile, caption)

    // 👉 new post ko top pe add karo (no reload)
    setFeed(prev => [res.post, ...prev])
  }

  // 🔥 LIKE
  const handleLike = async (postId) => {
    await likePost(postId)

    setFeed(prev =>
      prev.map(post =>
        post._id === postId ? { ...post, isLiked: true } : post
      )
    )
  }

  // 🔥 UNLIKE
  const handleUnLike = async (postId) => {
    await unLikePost(postId)

    setFeed(prev =>
      prev.map(post =>
        post._id === postId ? { ...post, isLiked: false } : post
      )
    )
  }

  return {
    feed,
    setFeed,
    loading,
    handleGetFeed,
    handleCreatePost,  // 🔥 EXPORT THIS
    handleLike,
    handleUnLike
  }
}