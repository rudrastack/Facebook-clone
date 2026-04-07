import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'
import { useAuth } from '../../auth/hooks/useAuth' 

const Feed = () => {

  const { user } = useAuth() 

  const {
    feed,
    setFeed,
    handleGetFeed,
    loading,
    handleLike,
    handleUnLike
  } = usePost()

  useEffect(() => {
    handleGetFeed()
  }, [user])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <main className='feed-page'>
      <div className="feed">

     
<Nav user={user} setPosts={setFeed} />

        <div className="posts">
          {feed.map(post => (
            <Post
              key={post._id}
              user={post.user}
              post={post}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
              setPosts={setFeed}
            />
          ))}
        </div>

      </div>
    </main>
  )
}

export default Feed