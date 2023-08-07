import React, { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import UserContext from './UserContext'

function EditMilestone() {
  const navigate = useNavigate()
  const { milestoneId } = useParams()
  const { user } = useContext(UserContext)
  const user_id = user.id
  const [editingMilestone, setEditingMilestone] = useState()
  const [error, setError] = useState(null)
  const [authorized, setAuthorized] = useState(false)

  // Fetch all the milestones from the backend on component mount
  useEffect(() => {
    fetch('/milestones')
      .then((response) => response.json())
      .then((data) => {
        const milestone = data.find((milestone) => milestone.id === parseInt(milestoneId))
        if (milestone.user_id == user.id){
          setEditingMilestone(milestone)
          console.log(milestone)
        }
        
        formik.setValues({
          header: milestone.header,
          subheader: milestone.subheader,
          description: milestone.description,
          date: milestone.date,
          aspect_id: milestone.aspect_id,
        })
        if (user_id === milestone.user_id) {
          setAuthorized(true)
        } else {
          setError('You are not authorized to edit this milestone.')
        }
      })
      .catch((error) => {
        console.error('Error fetching milestones:', error)
      })
  }, [milestoneId, user_id])

  const formik = useFormik({
    initialValues: {
      header: '',
      subheader: '',
      description: '',
      date: '',
      // aspect_id: '',
    },
    onSubmit: (values) => {
      values.user_id = user_id
      console.log(values)
      fetch(`/milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('Error updating milestone')
          }
        })
        .then(() => {
          navigate('/')
        })
        .catch((error) => {
          console.error('Error updating milestone:', error)
        })
    },
  })

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
            {formik.touched.header && formik.errors.header && <div>{formik.errors.header}</div>}
            <input
              type="text"
              name="subheader"
              placeholder="New Subheader"
              value={formik.values.subheader}
              onChange={formik.handleChange}
            />
            {formik.touched.subheader && formik.errors.subheader && <div>{formik.errors.subheader}</div>}
            <input
              type="text"
              name="description"
              placeholder="New Description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description && (
              <div>{formik.errors.description}</div>
            )}
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