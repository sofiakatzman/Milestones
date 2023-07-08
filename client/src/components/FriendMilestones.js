import { VerticalTimeline } from 'react-vertical-timeline-component'
import TimelineComponent from "./Timeline"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function FriendMilestones() {
  const [friendData, setFriendData] = useState(null)
  const { user_id } = useParams()
  const [error, setError] = useState(false)
  const [username, setUsername] = useState("")

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
        setFriendData(data)})
      .catch(() => setError(true))
     
  }, [user_id])

  if (error) {
    return <div>Error! User not found.</div>
  }

  return (
    <div>
        <h1>{username.toLowerCase()}</h1>
        <p>This is {username}'s timeline. Take a look!</p>
      <VerticalTimeline>
        {friendData &&
          friendData.map((item) => (
            <TimelineComponent key={item.id} data={item} />
          ))}
      </VerticalTimeline>
    </div>
  )
}

export default FriendMilestones