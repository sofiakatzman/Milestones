import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LiveFeed({ broadcast, milestones }) {
  const navigate = useNavigate();
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const handleMilestoneHover = (milestone) => {
    setExpandedMilestone(milestone);
  };

  const handleMilestoneLeave = () => {
    setExpandedMilestone(null);
  };

  return (
    <div className="live-feed-container">
      <h1>Live Feed</h1>
      <div className="feed-info">
        <p className="feed-info">New Updates: {broadcast.length}</p>
        <hr className="divider" />
      </div>
      <div className="milestone-list">
        {broadcast.map((milestone, index) => (
          <div
            key={index}
            className={`milestone-item ${expandedMilestone === milestone ? 'expanded' : ''}`}
            onMouseEnter={() => handleMilestoneHover(milestone)}
            onMouseLeave={handleMilestoneLeave}
          >
            <p>
              <b onClick={() => navigate(`/timelines/${milestone.user_id}`)}>{milestone.user.username}</b>
              <i> created a new milestone:</i> <br />{milestone.header}
            </p>
            {expandedMilestone === milestone && (
              <div className="milestone-details">
                <p>{milestone.subheader}</p>
                <p>{milestone.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="feed-info">
        <p className="feed-info">Milestone History: {milestones.length}</p>
        <hr className="divider" />
      </div>
      <div className="milestone-list">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`milestone-item ${expandedMilestone === milestone ? 'expanded' : ''}`}
            onMouseEnter={() => handleMilestoneHover(milestone)}
            onMouseLeave={handleMilestoneLeave}
          >
            <p>
              <b onClick={() => navigate(`/timelines/${milestone.user_id}`)}>{milestone.user.username}</b>
              <i> created a new milestone:</i> <br />"{milestone.header}"
            </p>
            {expandedMilestone === milestone && (
              <div className="milestone-details">
                <p>{milestone.subheader}</p>
                <p>{milestone.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveFeed;