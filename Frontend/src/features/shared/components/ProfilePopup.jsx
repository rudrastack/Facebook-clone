import { useEffect, useState } from "react"
import { getStats, getRequests } from "../../follow/services/follow.api"
import "../components/pfp.scss"

const ProfilePopup = ({ user, onClose }) => {

  const [stats, setStats] = useState({ followers: 0, following: 0 })
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

const fetchData = async () => {
  try {
    const s = await getStats()
    const r = await getRequests()

    setStats(s)
    setRequests(r?.requests || [])
  } catch (err) {
    console.log(err)
  }
}

  return (
    <div className="overlay" onClick={onClose}>

     <div className="popup" onClick={(e) => e.stopPropagation()}>

  {/* ❌ CLOSE BUTTON */}
  <span className="close-btn" onClick={onClose}>✖</span>


        <h2>{user.username}</h2>

        <p>Followers: {stats.followers}</p>
        <p>Following: {stats.following}</p>

        <hr />

        <h3>Requests</h3>

        {requests?.length === 0 && <p>No requests</p>}

        {requests?.map(req => (
          <div key={req._id}>
            {req.follower.username}
          </div>
        ))}

      </div>

    </div>
  )
}

export default ProfilePopup