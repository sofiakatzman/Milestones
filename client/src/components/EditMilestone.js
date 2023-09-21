import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import UserContext from './UserContext';

function EditMilestone() {
  const navigate = useNavigate();
  const { milestoneId } = useParams();
  const { user } = useContext(UserContext);
  const user_id = user.id;
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const formik = useFormik({
    initialValues: {
      header: '',
      subheader: '',
      description: '',
      date: '',
      // aspect_id: '',
    },
    onSubmit: (values) => {
      values.user_id = user_id;
      console.log(values);
      fetch(`/api/milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Error updating milestone');
          }
        })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error updating milestone:', error);
        });
    },
  });

  // Fetch all the milestones from the backend on component mount
  useEffect(() => {
    fetch('/api/milestones')
      .then((response) => response.json())
      .then((data) => {
        const milestone = data.find((milestone) => milestone.id === parseInt(milestoneId));
        if (milestone.user_id === user.id) {
          setEditingMilestone(milestone);
          // Use Formik's setValues to set initial values
          formik.setValues({
            header: milestone.header,
            subheader: milestone.subheader,
            description: milestone.description,
            date: milestone.date,
            aspect_id: milestone.aspect_id,
          });
          setAuthorized(true);
        } else {
          setError('You are not authorized to edit this milestone.');
        }
      })
      .catch((error) => {
        console.error('Error fetching milestones:', error);
      });
  }, [milestoneId, user.id]);

  return (
    <>
      {authorized ? (
        <>
          {/* Edit form */}
          <h1>Edit Milestone Details</h1>
          <form className="auth-form" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="header"
              placeholder="New Header"
              value={formik.values.header}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              name="subheader"
              placeholder="New Subheader"
              value={formik.values.subheader}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="New Description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <input
              type="date"
              name="date"
              placeholder="new date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
}

export default EditMilestone;