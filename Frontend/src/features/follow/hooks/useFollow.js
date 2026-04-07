import {
  sendFollowRequest,
  unfollowUser,
  handleRequest
} from "../services/follow.api"

export const useFollow = (setPosts) => {

  const updateUI = (username, type) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.user.username !== username) return post

        switch (type) {
          case "follow":
            return { ...post, followStatus: "pending" }

          case "unfollow":
            return { ...post, followStatus: "none" }

          case "accept":
            return { ...post, followStatus: "accepted" }

          case "reject":
            return { ...post, followStatus: "none" }

          default:
            return post
        }
      })
    )
  }

  return {
    // 🔥 THIS IS THE HANDLER YOU ASKED
    follow: async (username) => {
      await sendFollowRequest(username)

      // ✅ UI update without reload
      updateUI(username, "follow")
    },

    unfollow: async (username) => {
      await unfollowUser(username)
      updateUI(username, "unfollow")
    },

    accept: async (requestId, username) => {
      await handleRequest(requestId, "accepted")
      updateUI(username, "accept")
    },

    reject: async (requestId, username) => {
      await handleRequest(requestId, "rejected")
      updateUI(username, "reject")
    }
  }
}

// import {
//   sendFollowRequest,
//   unfollowUser,
//   handleRequest
// } from "../services/follow.api"

// export const useFollow = (setPosts) => {

//   const updateUI = (username, type) => {
//     setPosts(prev =>
//       prev.map(post => {
//         if (post.user.username !== username) return post

//         switch (type) {
//           case "follow":
//             return { ...post, followStatus: "pending" }

//           case "unfollow":
//             return { ...post, followStatus: "none" }

//           case "accept":
//             return { ...post, followStatus: "accepted" }

//           case "reject":
//             return { ...post, followStatus: "none" }

//           default:
//             return post
//         }
//       })
//     )
//   }

//   return {
//     follow: async (username) => {
//       await sendFollowRequest(username)
//       updateUI(username, "follow")
//     },

//     unfollow: async (username) => {
//       await unfollowUser(username)
//       updateUI(username, "unfollow")
//     },

//     accept: async (requestId, username) => {
//       await handleRequest(requestId, "accepted")
//       updateUI(username, "accept")
//     },

//     reject: async (requestId, username) => {
//       await handleRequest(requestId, "rejected")
//       updateUI(username, "reject")
//     }
//   }
// }