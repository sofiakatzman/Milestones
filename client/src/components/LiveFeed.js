import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('/')

function LiveFeed({ broadcast }) {
  const [milestones, setMilestones] = useState([])

  useEffect(() => {
    // Fetch all previous milestones
    fetch('/milestones')
      .then((r) => r.json())
      .then((data) => {
        // Sort the milestones based on their milestone_id in descending order
        const sortedData = data.sort((a, b) => b.id - a.id)
        setMilestones(sortedData)
      })
  }, [])

  // Handle the new milestone data from WebSocket
  useEffect(() => {
    setMilestones((prevMilestones) => [...prevMilestones, ...broadcast])
  }, [broadcast])

  return (
    <div>
      <h2>Live Feed</h2>
      {milestones.map((milestone, index) => (
        <div key={index}>
          <p>
            {milestone.user.username} created a new milestone: <br />
            {milestone.header}, {milestone.description} <br />
            Aspect: {milestone.aspect_id}
          </p>
        </div>
      ))}
    </div>
  )
}

export default LiveFeed
