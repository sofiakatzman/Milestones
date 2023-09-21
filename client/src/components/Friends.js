import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from './UserContext'

function Friends() {
  const [friends, setFriends] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const user_id = user.id

  useEffect(() => {
    fetch(`/api/users/${user_id}/friends`)
      .then((r) => r.json())
      .then((data) => setFriends(data))
  }, [user_id])

  const handleFriendClick = (friendID) => {
    navigate(`/timelines/${friendID}`)
  }

  return (
    <>
      <h1>friends</h1>
      <br />
      {friends && friends.length > 0 ? (
        <div className="cards">
          {friends.map((friend) => (
            <div
              className="card"
              key={friend.username}
              onClick={() => handleFriendClick(friend.friend_id)}
            >
              <img src="https://www.nicepng.com/png/full/12-120709_png-file-human-icon-png.png" alt="friend avatar" />
              <span>{friend.username}</span>
              <p className="birthday">{friend.birthday}</p>
            </div>
          ))}
        </div>
      ) : (
        <h4>You haven't added any friends yet...</h4>
      )}
    </>
  )
}

export default Friends