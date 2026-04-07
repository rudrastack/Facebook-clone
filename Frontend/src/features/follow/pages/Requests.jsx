import { useEffect, useState } from "react"
import { getRequests, handleRequest } from "../services/follow.api"

const Requests = () => {

  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const res = await getRequests()
    setRequests(res.requests)
  }

  const handleAction = async (id, status) => {
    await handleRequest(id, status)

    // UI update
    setRequests(prev => prev.filter(r => r._id !== id))
  }

  return (
    <div>
      <h2>Follow Requests</h2>

      {requests.map(req => (
        <div key={req._id} style={{ margin: "10px" }}>
          
          <p>{req.follower.username}</p>

          <button onClick={() => handleAction(req._id, "accepted")}>
            Accept
          </button>

          <button onClick={() => handleAction(req._id, "rejected")}>
            Reject
          </button>

        </div>
      ))}

    </div>
  )
}

export default Requests