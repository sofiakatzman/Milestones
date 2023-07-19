import { VerticalTimeline } from 'react-vertical-timeline-component'
import TimelineComponent from "./Timeline"
import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"

function Milestones({user_id}) {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [aspects, setAspects] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    //fetch user milestones 
    fetch(`http://127.0.0.1:5000/milestone/${user_id}`)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setFilteredData(data)
      })

    //fetch for all aspects 
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
      })
      .catch(() => setError(true))
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

  const updateData = (milestoneID) => {
    
    console.log("HAHA")
    // navigate("/")
  }

  const handleDelete = (milestoneID) => {
    fetch(`http://127.0.0.1:5000/milestones/${milestoneID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Milestone deleted successfully!")
          // filter out the deleted milestone 
          const deleted = data.filter((milestone) => milestone.id !== milestoneID)
          setFilteredData(deleted)
          setData(deleted)
        } else {
          console.error("Failed to delete milestone.")
        }
      })
      .catch((error) => {
        console.error("Error deleting milestone:", error)
      })
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
        <h1>welcome home</h1>
        <p>These are your milestones!</p>
        {filteredData && filteredData.length > 0 ? (
          <VerticalTimeline>
            {filteredData.map((item) => (
              <TimelineComponent key={item.id} data={item} canDelete={true} handleDelete={handleDelete} />
            ))}
          </VerticalTimeline>
        ) : (
          <h3>Sorry! No milestones under that filter -- try a different one!</h3>
        )}
      </div>
      </>)
}

export default Milestones