import { useState } from "react"
import { getFeed, likePost, unLikePost, createPost } from "../services/post.api"

export const usePost = () => {

  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(false)

  // GET FEED
  const handleGetFeed = async () => {
    setLoading(true)
    const res = await getFeed()
    setFeed(res.posts)
    setLoading(false)
  }

  // CREATE POST
  const handleCreatePost = async (imageFile, caption) => {
    const res = await createPost(imageFile, caption)

  
    setFeed(prev => [res.post, ...prev])
  }

  // LIKE
  const handleLike = async (postId) => {
    await likePost(postId)

    setFeed(prev =>
      prev.map(post =>
        post._id === postId ? { ...post, isLiked: true } : post
      )
    )
  }

  // UNLIKE
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
    handleCreatePost, 
    handleLike,
    handleUnLike
  }
}