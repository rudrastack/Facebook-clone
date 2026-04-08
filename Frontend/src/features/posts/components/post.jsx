import React from 'react'
import { useFollow } from "../../follow/hooks/useFollow"
import "../style/post.scss"

const Post = ({ user, post, handleLike, handleUnLike, setPosts }) => {

  const { follow, unfollow, accept, reject } = useFollow(setPosts)

  const status = post.followStatus

  return (
    <div className="post">

      {/* HEADER */}
      <div className="user">
        <div className="top-left">
          <img src={user.profilePicture} alt="" />
          <p>{user.username}</p>
        </div>

        <div className="top-right">

          {status === "none" && (
            <button className='follow-btn' onClick={() => follow(user.username)}>Follow</button>
          )}

          {status === "pending" && (
            <button className='pending-btn' disabled>
              Requested
            </button>
          )}

          {status === "accepted" && (
            <button className='unfollow-btn' onClick={() => unfollow(user.username)}>
              Following
            </button>
          )}

          {status === "incoming" && (
            <div className="request-btns" >
              <button className='accept-btn' onClick={() => accept(post.requestId, user.username)}>
                Accept
              </button>
              <button className='reject-btn' onClick={() => reject(post.requestId, user.username)}>
                Reject
              </button>
            </div>
          )}

        </div>
      </div>

      {/* IMAGE */}
      <img src={post.imgUrl} alt="" />

      {/* LIKE SECTION */}
      <div className="icons">
        <div className="left">
          <button>
            <svg
              className={post.isLiked ? "like" : ""}
              onClick={() => { post.isLiked ? handleUnLike(post._id) : handleLike(post._id) }}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path></svg></button>
          <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z"></path></svg></button>
          <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path></svg></button>
        </div>
        <div className="right">
          <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path></svg></button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption">{post.caption}</p>
      </div>
    </div>
  )
}

export default Post