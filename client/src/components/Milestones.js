import { VerticalTimeline } from 'react-vertical-timeline-component'
import TimelineComponent from "./Timeline"
import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"

function Milestones({user_id, updateUser}) {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [aspects, setAspects] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    //fetch user milestones 
    fetch(`/milestone/${user_id}`)
      .then(response => response.json())
      .then(data => {
        const sortedData = [...data]
        sortedData.sort((a, b) => new Date(a.date) - new Date(b.date))
        setData(sortedData)
        setFilteredData(sortedData)
      })

    //fetch for all aspects 
    fetch(`/aspects`)
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

  const handleDelete = (milestoneID) => {
    fetch(`/milestones/${milestoneID}`, {
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
            <h1>your milestones</h1>


      <div>
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
                  </div>  <VerticalTimeline>
            {filteredData.map((item) => (
 
              <TimelineComponent key={item.id} data={item} canDelete={true} handleDelete={handleDelete} />
            ))}
          </VerticalTimeline></>
        ) : (
          <h4>Sorry! No milestones to show. </h4>
        )}
      </div>
      </>)
}

export default Milestones