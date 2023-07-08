import { VerticalTimeline } from 'react-vertical-timeline-component'
import TimelineComponent from "./Timeline"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function FriendMilestones() {
  const [friendData, setFriendData] = useState(null)
  const { user_id } = useParams()
  const [error, setError] = useState(false)
  const [username, setUsername] = useState("")
  const [filteredData, setFilteredData] = useState(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/timeline/${user_id}`)
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
  }, [user_id])

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
    return <div>Error! User not found.</div>
  }

  return (
    <>
      <div className="filters">
        {/* Display filter choices as emojis and handle their selection */}
        <button className="filter-button" onClick={() => handleFilterOption(1)}>
          <span role="img" aria-label="education">✏️</span>
        </button>


        <button className="filter-button" onClick={() => handleFilterOption(2)}>
          <span role="img" aria-label="growth">🌱</span>
        </button>

        <button className="filter-button" onClick={() => handleFilterOption(3)}>
          <span role="img" aria-label="achievements">🏆</span>
        </button>

        <button className="filter-button" onClick={() => handleFilterOption(4)}>
          <span role="img" aria-label="life-changes">✈️</span>
        </button>

        <button className="filter-button" onClick={() => handleFilterOption(5)}>
          <span role="img" aria-label="professional">💼</span>
        </button>

        <button className="filter-button" onClick={() => handleFilterOption("all")}>
          <span role="img" aria-label="view-all">❌</span>
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