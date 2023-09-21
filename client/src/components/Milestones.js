import React, { useEffect, useContext, useState } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import TimelineComponent from './Timeline';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function Milestones() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [aspects, setAspects] = useState(null);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('asc'); // Default sorting order is ascending
  const { user } = useContext(UserContext);
  const user_id = user.id;

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user milestones
    fetch(`/api/milestone/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = [...data];

        // Sort the data based on the current sorting order
        sortedData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortBy === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setData(sortedData);
        setFilteredData(sortedData);
      });

    // Fetch all aspects
    fetch(`/api/aspects`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No aspects found');
        }
      })
      .then((data) => {
        setAspects(data);
      })
      .catch(() => setError(true));
  }, [user_id, sortBy]); // Include sortBy in the dependency array

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

  const handleDelete = (milestoneID) => {
    fetch(`/api/milestones/${milestoneID}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Milestone deleted successfully!');
          // Filter out the deleted milestone
          const deleted = data.filter((milestone) => milestone.id !== milestoneID);
          setFilteredData(deleted);
          setData(deleted);
        } else {
          console.error('Failed to delete milestone.');
        }
      })
      .catch((error) => {
        console.error('Error deleting milestone:', error);
      });
  };

  const handleEdit = (milestoneId) => {
    navigate(`/edit/milestone/${milestoneId}`);
  };

  const toggleSortOrder = () => {
    // Toggle the sorting order between 'asc' and 'desc'
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <h1>welcome, {user.username}</h1>

      <div>
        {/* Display filters */}
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
              );
            })}
          <button
            className="filter-button"
            onClick={() => handleFilterOption('all')}
          >
            <span role="img" aria-label="remove-filter">
              ❌
            </span>
            <h6 className="hide-hover">clear filter</h6>
          </button>
        </div>

        {/* Sort By button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={toggleSortOrder} className="sort-button">
            {sortBy === 'asc' ? '▲' : '▼'} sort by date
          </button>
        </div>

        {/* Display milestones */}
        {filteredData && filteredData.length > 0 ? (
          <VerticalTimeline>
            {filteredData.map((item) => (
              <TimelineComponent
                key={item.id}
                data={item}
                canDelete={true}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </VerticalTimeline>
        ) : (
          <h4>Sorry! No milestones to show. </h4>
        )}
      </div>
    </>
  );
}

export default Milestones;
