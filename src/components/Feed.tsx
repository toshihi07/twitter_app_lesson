import React from 'react'
import  {auth} from '../features/firebase'

const Feed = () => {

  return (
    <div>
      <button onClick={auth.signOut}>ログアウト</button>
    </div>
  )
}

export default Feed
