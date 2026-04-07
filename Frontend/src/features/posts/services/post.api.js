import axios from "axios"

export const api = axios.create({  
    baseURL: "https://facebook-clone-3vpt.onrender.com",
    // baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get('/api/postfb/feed')
    return response.data
}

export async function createPost(imageFile, caption) {
    const formData = new FormData()
    formData.append("image", imageFile)
    formData.append('caption', caption)

    const response = await api.post("/api/postfb", formData)
    return response.data
}

export async function likePost(postId) {
    const response = await api.post("/api/postfb/like/" + postId)
    return response.data
}

export async function unLikePost(postId) {
    const response = await api.post("/api/postfb/unlike/" + postId)
    return response.data
}