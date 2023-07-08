import { VerticalTimeline } from 'react-vertical-timeline-component'
import TimelineComponent from "./Timeline"
import { useEffect, useState } from "react"

function Milestones() {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/milestones')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setFilteredData(data)
      })
  }, [])

  const handleFilterOption = (option) => {
    if (option === 'all') {
      setFilteredData(data)
    } else {
      const filteredMilestones = data.filter(
        (milestone) => milestone.aspect_id === option
      )
      setFilteredData(filteredMilestones)
    }
  }

  return (
    <>
      <div className="filters">
        {/* Display filter choices as emojis and handle their selection */}

        <button className="filter-button" onClick={() => handleFilterOption(1)}>
           <span role="img" aria-label="education">✏️</span></button>

        <button className="filter-button" onClick={() => handleFilterOption(2)}>
          <span role="img" aria-label="growth">🌱</span></button>

        <button className="filter-button" onClick={() => handleFilterOption(3)}>
          <span role="img" aria-label="achievements">🏆</span></button>

        <button className="filter-button" onClick={() => handleFilterOption(4)}>
          <span role="img" aria-label="life-changes">✈️</span></button>

        <button className="filter-button" onClick={() => handleFilterOption(5)}>
          <span role="img" aria-label="professional">💼</span></button>

          <button className="filter-button" onClick={() => handleFilterOption("all")}>
           <span role="img" aria-label="view-all">❌</span></button>

     <br /><br />
      </div>

      <VerticalTimeline>
        {filteredData && filteredData.map((item) => (
          <TimelineComponent key={item.id} data={item} />
        ))}
      </VerticalTimeline>
    </>
  )
}

export default Milestones