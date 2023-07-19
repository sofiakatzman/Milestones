import { VerticalTimeline } from 'react-vertical-timeline-component'
import TimelineComponent from "./Timeline"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function FriendMilestones() {
  const [friendData, setFriendData] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState("")
  const [filteredData, setFilteredData] = useState(null)
  const [aspects, setAspects] = useState(null)

  const { user_id } = useParams()

  useEffect(() => {
    console.log(user_id)
    // fetch for user milestones
    fetch(`http://127.0.0.1:5000/milestone/${user_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("User not found")
        }
      })
      .then((data) => {
        setUsername(data[0].user.username)
        setFriendData(data)
        setFilteredData(data)
      })
      .catch(() => setError(true))
    // fetch for database aspects
    fetch(`http://127.0.0.1:5000/aspects`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No aspects found")
        }
      })
      .then((data) => {
        setAspects(data)
        console.log(data)
      })
      .catch(() => setError(true))
  }, [])

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

  if (error) {
    return <div>No milestones yet!</div>
  }

  return (
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
            );
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
        <h1>{username.toLowerCase()}</h1>
        <p>This is {username}'s timeline. Take a look!</p>
        {filteredData && filteredData.length > 0 ? (
          <VerticalTimeline>
            {filteredData.map((item) => (
              <TimelineComponent key={item.id} data={item} />
            ))}
          </VerticalTimeline>
        ) : (
          <h3>Sorry! No milestones under that filter -- try a different one!</h3>
        )}
      </div>
    </>
  )
}

export default FriendMilestones