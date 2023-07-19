import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function Friends({user_id}) {
    const [friends, setFriends] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      fetch(`http://127.0.0.1:5000/friends`)
        .then((r) => r.json())
        .then((data) => setFriends(data))
    }, [])
  
    const handleFriendClick = (friendID) => {
        navigate(`/timelines/${friendID}`)
    }

    if (!friends) {
      return (<>
        <h1>friends</h1>
        <br />
        <h4>You haven't added any friends yet...</h4>
        </>
      )
    }
  
    return (
      <>
        <h1>friends</h1>
        <br />
        <div className="cards">
          {friends.map((friend) => {
            if (friend.user_id === user_id) {
              return (
                <div
                  className="card"
                  key={friend.friend.username}
                  onClick={() => handleFriendClick(friend.friend.id)}
                >
                  <img src="https://www.nicepng.com/png/full/12-120709_png-file-human-icon-png.png" alt="friend avatar" />
                  <span>{friend.friend.username}</span>
                  <p className="birthday">{friend.friend.birthday}</p>
                </div>
              )
            }
            return null
          })}
        </div>
      </>
    )
  }

  export default Friends