import { useState } from "react"
import { useFollow } from "../../follow/hooks/useFollow"
const PostMenu = ({ post, setPosts }) => {
  const [open, setOpen] = useState(false)

  const { follow, unfollow, accept, reject } = useFollow(setPosts)

  const status = post.followStatus // "none" | "pending" | "accepted"

  return (
    <div style={{ position: "relative" }}>

      <div onClick={() => setOpen(!open)}>⋮</div>

      {open && (
        <div className="menu">

          {status === "none" && (
            <button onClick={() => follow(post.user.username)}>
              Follow
            </button>
          )}

          {status === "pending" && (
            <button disabled>Request Sent</button>
          )}

          {status === "accepted" && (
            <button onClick={() => unfollow(post.user.username)}>
              Unfollow
            </button>
          )}

          {post.requestId && (
            <>
              <button onClick={() => accept(post.requestId, post.user.username)}>
                Accept
              </button>
              <button onClick={() => reject(post.requestId, post.user.username)}>
                Reject
              </button>
            </>
          )}

        </div>
      )}

    </div>
  )
}

export default PostMenu