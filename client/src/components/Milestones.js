import { VerticalTimeline } from 'react-vertical-timeline-component';
import TimelineComponent from "./Timeline";
import { useEffect, useState } from "react";

function Milestones() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/users')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <>
      {/* <div className="filters" >
        💼  ✏️  🌱  🏆  ✈️
        <br/><br/>
      </div> */}

      <VerticalTimeline>
        {data && data.map((item, index) => (
          <TimelineComponent key={index} data={item} />
        ))}
      </VerticalTimeline>
    </>
  );
}

export default Milestones;