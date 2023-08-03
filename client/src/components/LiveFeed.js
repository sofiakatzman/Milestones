import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

function LiveFeed({ broadcast, milestones }) {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Live Feed</h1>
      <p>New Updates since Last Visit: {broadcast.length}</p>
      <p>_________________________</p>
      {broadcast.map((milestone, index) => (
        <div key={index}>
          <p>
            <i>
              <b onClick={() => navigate(`/timelines/${milestone.user_id}`)}>{milestone.user.username}</b>
            </i> created a new milestone: {milestone.header}
          </p>
        </div>
      ))} <p>_________________________</p>
      <p>Milestone History: {milestones.length}</p>

      {milestones.map((milestone, index) => (
              <div key={index}>
                <p>
                  <i>
                    <b onClick={() => navigate(`/timelines/${milestone.user_id}`)}>{milestone.user.username}</b>
                  </i> created a new milestone: {milestone.header}
                </p>
              </div>
            ))}
      
    </div>
  )
}

export default LiveFeed
