import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

function Create({ user_id }) {
  let navigate = useNavigate()
  const [aspects, setAspects] = useState([]) // Step 1: State variable to store aspects

  useEffect(() => {
    // Step 2: Fetch aspects from the server and update the state variable
    fetch('http://127.0.0.1:5000/aspects')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('No aspects found')
        }
      })
      .then((data) => {
        setAspects(data)
        console.log(data)
      })
  }, []) // Empty dependency array to ensure the effect runs only once

  const formSchema = yup.object().shape({
    header: yup.string().required('Must enter a header'),
    aspect_id: yup.number().positive(),
    // Add validation for other fields if needed
  })

  const formik = useFormik({
    initialValues: {
      header: '',
      subheader: '',
      description: '',
      date: '',
      aspect_id: '',
      // is_private: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      values.user_id = user_id
      console.log(values)
      fetch('http://127.0.0.1:5000/milestones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((milestone) => {
            console.log(milestone)
            navigate('/')
          })
        }
      })
    },
  })

  return (
    <>
      <h1>create a new milestone</h1>
      <form className="create-milestone-form" onSubmit={formik.handleSubmit}>
        <label>Header</label> <br />
        <input type="text" name="header" value={formik.values.header} onChange={formik.handleChange} />
        <br />
        <label>Subheader</label> <br />
        <input
          type="text"
          name="subheader"
          value={formik.values.subheader}
          onChange={formik.handleChange}
        />
        <br />
        <label>Description</label> <br />
        <textarea
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <br />
        <label>Date</label> <br />
        <input type="date" name="date" value={formik.values.date} onChange={formik.handleChange} />
        <br />
        <label>Aspect</label> <br />
        <select // Step 3: Dropdown list for the "Aspect" field
          name="aspect_id"
          value={formik.values.aspect_id}
          onChange={formik.handleChange}
        >
          <option value="">--select aspect--</option>
          {aspects.map((aspect) => (
            <option key={aspect.id} value={aspect.id}>
              {aspect.name.toLowerCase()}
            </option>
          ))}
        </select>
        <br />
        {/* <label>Private?</label> <br/>
        <input
          type="checkbox"
          name="is_private"
          checked={formik.values.is_private}
          onChange={handleCheckboxChange}
        />
        <br/> */}
        <p className="errors">{formik.errors.header}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Create
