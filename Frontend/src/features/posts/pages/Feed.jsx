// import React, { useEffect } from 'react'
// import "../style/feed.scss"
// import Post from '../components/Post'
// import { usePost } from '../hooks/usePost'
// import Nav from '../../shared/components/Nav'

// const Feed = () => {

//     const { feed, handleGetFeed, loading, handleLike, handleUnLike } = usePost()

//     useEffect(() => {
//         handleGetFeed()
//     }, [])

//     if (loading || !feed) {
//         return (<main><h1>Feed is loading...</h1></main>)
//     }

//     console.log(feed)




//     return (
//         <main className='feed-page' >
//             <div className="feed">
//                 <Nav />

//                 <div className="posts">
//                     {feed.map(post => {
//                         return <Post user={post.user} post={post}  loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />
//                     })}
//                 </div>
//             </div>
//         </main>
//     )
// }

// export default Feed

import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'
import { useAuth } from '../../auth/hooks/useAuth' // ✅ NEW

const Feed = () => {

  const { user } = useAuth() // ✅ NEW

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
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }
console.log("USER:", user)
  return (
    <main className='feed-page'>
      <div className="feed">

        {/* ✅ FIXED */}
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