import { useEffect, useState } from "react"

function Icon({ type }) {

  const [aspects, setAspects] = useState([])

  useEffect(() => {
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

  }, [])
  
    const selectedType = aspects.find(item => item.id === type);
    const icon = selectedType ? selectedType.icon : "";
  
    return (
      <div className="icon">{icon}</div>
    );
  }
  
  export default Icon;