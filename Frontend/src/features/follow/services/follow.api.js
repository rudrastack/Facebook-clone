import { api } from "../../posts/services/post.api"

export const sendFollowRequest = (username) =>
  api.post(`/api/followfb/freind/${username}`)

export const unfollowUser = (username) =>
  api.delete(`/api/followfb/freind/${username}`)

export const handleRequest = (requestId, status) =>
  api.patch(`/api/followfb/freind/requests/${requestId}`, { status })

export const getRequests = () =>
  api.get(`/api/followfb/freind/requests`)

export const getStats = async () => {
  const res = await api.get(`/api/followfb/freind/stats`)
  return res.data
}