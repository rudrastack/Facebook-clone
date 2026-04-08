import React, { useState, useEffect } from "react"
import "./nav.scss"
import { useNavigate } from "react-router"
import { getRequests, getStats } from "../../follow/services/follow.api"
import { useFollow } from "../../follow/hooks/useFollow"
import ProfilePopup from "./ProfilePopup"

const Nav = ({ user, setPosts }) => {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [requests, setRequests] = useState([])
  const [stats, setStats] = useState({ followers: 0, following: 0 })
  const [showProfile, setShowProfile] = useState(false)

  const { accept, reject } = useFollow(setPosts)

  const goToCreatePost = () => navigate("/create-post")

  useEffect(() => {
    if (open) {
      fetchRequests()
      fetchStats()
    }
  }, [open])

  const fetchRequests = async () => {
    const res = await getRequests()
    setRequests(res.requests)
  }

  const fetchStats = async () => {
    const res = await getStats()
    setStats(res)
  }

  return (
    <div className="nav">


      <div className="nav-top">

        <p className="logo">facebook</p>


        <div className="nav-right">

          {user && (
            <div
              className="user-info"
              onClick={() => setShowProfile(true)}
            >
              {showProfile && (
                <ProfilePopup
                  user={user}
                  onClose={() => setShowProfile(false)}
                />
              )}

              <img src={user.profilePicture} alt="" />


              {open && (
                <div
                  className="dropdown"
                  onClick={(e) => e.stopPropagation()}
                >

                  <h4>{user?.username}</h4>

                  <p>Followers: {stats.followers}</p>
                  <p>Following: {stats.following}</p>

                  <hr />

                  <h5>Requests</h5>

                  {requests?.length === 0 && <p>No requests</p>}

                  {requests?.map(req => (
                    <div key={req._id} className="req-item">

                      <span>{req.follower.username}</span>

                      <button onClick={(e) => {
                        e.stopPropagation()
                        accept(req._id, req.follower.username)
                        setRequests(prev => prev.filter(r => r._id !== req._id))
                      }}>
                        ✅
                      </button>

                      <button onClick={(e) => {
                        e.stopPropagation()
                        reject(req._id, req.follower.username)
                        setRequests(prev => prev.filter(r => r._id !== req._id))
                      }}>
                        ❌
                      </button>

                    </div>
                  ))}

                </div>
              )}

            </div>
          )}


        </div>

      </div>


      <div className="create-post">

        <div className="input-box" onClick={goToCreatePost}>
          What's on your mind?
        </div>

        <button onClick={goToCreatePost} className="image-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z" />
          </svg>
        </button>

      </div>

    </div>
  )
}

export default Nav