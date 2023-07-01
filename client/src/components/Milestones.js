import { VerticalTimeline } from 'react-vertical-timeline-component';
import TimelineComponent from "./Timeline";
import { useEffect, useState } from "react";

function Milestones() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/milestones')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  const handleFilterOption = (option) => {
    if (option === 'all') {
      setFilteredData(data);
    } else {
      const filteredMilestones = data.filter(
        (milestone) => milestone.aspect_id === option
      );
      setFilteredData(filteredMilestones);
    }
  };

  return (
    <>
      <div className="filters">
        {/* Display filter choices as emojis and handle their selection */}
        <button onClick={() => handleFilterOption('all')}>
          Show All
        </button>
        <button onClick={() => handleFilterOption(1)}>
          ✏️
        </button>
        <button onClick={() => handleFilterOption(2)}>
          🌱
        </button>
        <button onClick={() => handleFilterOption(3)}>
          🏆
        </button>
        <button onClick={() => handleFilterOption(4)}>
          ✈️
        </button>
        <button onClick={() => handleFilterOption(5)}>
          💼
        </button>
        <br /><br />
      </div>

      <VerticalTimeline>
        {filteredData && filteredData.map((item) => (
          <TimelineComponent key={item.id} data={item} />
        ))}
      </VerticalTimeline>
    </>
  );
}

export default Milestones;
