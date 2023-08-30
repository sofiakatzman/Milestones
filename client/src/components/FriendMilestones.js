import { VerticalTimeline } from 'react-vertical-timeline-component'
import TimelineComponent from "./Timeline"
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import UserContext from './UserContext'

function FriendMilestones() {
  const [friendData, setFriendData] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState("")
  const [filteredData, setFilteredData] = useState(null)
  const [aspects, setAspects] = useState(null)
  const [isFriend, setIsFriend] = useState(false)
  const [friendMessage, setFriendMessage] = useState(false)

  const { user_id } = useParams()
  const { user } = useContext(UserContext)

  useEffect(() => {
    // fetch for user milestones
    fetch(`/api/milestone/${user_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("User not found")
        }
      })
      .then((data) => {
        const sortedData = [...data]
        sortedData.sort((a, b) => new Date(a.date) - new Date(b.date))
        setUsername(sortedData[0].user.username)
        setFriendData(sortedData)
        setFilteredData(sortedData)
      })
      .catch(() => setError(true))
    // fetch for database aspects
    fetch(`/api/aspects`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No aspects found")
        }
      })
      .then((data) => {
        setAspects(data)
      })
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    // Check if the logged-in user and the user whose profile you are viewing are friends
      fetch(`/api/users/${user.id}/friends`)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Error fetching friends')
          }
        })
        .then((friends) => {
          const isUserFriend = friends.some((friend) => friend.friend_id === parseInt(user_id))
          setIsFriend(isUserFriend)
          console.log(isUserFriend)
        })
      .catch(() => setError(true))
    
  }, [user, user_id])

  const handleFilterOption = (option) => {
    if (option === 'all') {
      setFilteredData(friendData)
    } else {
      const filteredMilestones = friendData.filter(
        (milestone) => milestone.aspect_id === option
      )
      setFilteredData(filteredMilestones)
    }
  }

  const handleCheckboxChange = () => {
      setIsFriend(!isFriend)
      if (!isFriend) {
        console.log('Add friend action')
        fetch(`/api/users/${user.id}/friends`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ friend_id: parseInt(user_id) }),
        })
      } else {
        console.log('Delete friend action')
        fetch(`/api/users/${user.id}/friends`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ friend_id: parseInt(user_id) }), 
        })
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('Failed to delete friend')
            }
          })
          .then((data) => {
            console.log('Friend deleted successfully', data)
          })
          .catch((error) => {
            console.error('Error deleting friend', error)
          })
    }
  }


  if (error) {
    return <div>That user doesn't exist yet, or doesn't currently have any milestones! Sorry! </div>
  }

  return (
    <>
       <label className="switch">
      <input
        type="checkbox"
        checked={isFriend}
        onChange={handleCheckboxChange}
      />
      <span className="slider"></span>
    </label>
      {isFriend && <p className="friend-status">You are friends!</p>}
      {!isFriend && <p className="friend-status">You are not friends!</p>}
      
      <h1>{username.toLowerCase()}</h1>
      <p>This is {username}'s timeline. Take a look!</p>
      {filteredData && filteredData.length > 0 ? (
        <>
          <div className="filters">
            {aspects &&
              aspects.map((aspect) => {
                return (
                  <button
                    className="filter-button"
                    key={aspect.id}
                    onClick={() => handleFilterOption(aspect.id)}
                  >
                    <span role="img" aria-label={aspect.name}>
                      {aspect.icon}
                    </span>
                    <h6 className="hide-hover">{aspect.name.toLowerCase()}</h6>
                  </button>
                )
              })}
            <button
              className="filter-button"
              onClick={() => handleFilterOption("all")}
            >
              <span role="img" aria-label="remove-filter">
                ❌
              </span>
              <h6 className="hide-hover">clear filter</h6>
            </button>
          </div>
          <div>
            <VerticalTimeline>
              {filteredData.map((item) => (
                <TimelineComponent key={item.id} data={item} />
              ))}
            </VerticalTimeline>
          </div>
        </>
      ) : (
        <h3>Sorry! No milestones to show.</h3>
      )}
    </>
  )
}

export default FriendMilestones