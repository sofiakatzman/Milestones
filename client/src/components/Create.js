import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Create({ user_id }) {
  let navigate = useNavigate();
  const [aspects, setAspects] = useState([]);

  useEffect(() => {
    fetch('/aspects')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No aspects found');
        }
      })
      .then((data) => {
        setAspects(data);
      });
  }, []);

  const formSchema = yup.object().shape({
    header: yup.string().required('You must enter a header.'),
    date: yup.date().required('You must enter a date.'),  
    aspect_id: yup.number().required('You must select an aspect.'), 
  });

  const formik = useFormik({
    initialValues: {
      header: '',
      subheader: '',
      description: '',
      date: '',
      aspect_id: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      values.user_id = user_id;
      console.log(values);
      fetch('/milestones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((milestone) => {
            navigate('/');
          });
        }
      });
    },
  });

  return (
    <>
      <h1>new milestone</h1>
      
      <form className="auth-form" onSubmit={formik.handleSubmit}>
      
      
        <br />
        <input
          type="text"
          className="form-input"
          name="header"
          placeholder="Header"
          value={formik.values.header}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          className="form-input"
          name="subheader"
          placeholder="Subheader"
          value={formik.values.subheader}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          className="form-input"
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        <input
          type="date"
          className="form-input"
          placeholder="Date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        <select
          name="aspect_id"
          className="form-input"
          value={formik.values.aspect_id}
          onChange={formik.handleChange}
        >
          <option value="">aspect</option>
          {aspects.map((aspect) => (
            <option key={aspect.id} value={aspect.id}>
              {aspect.name.toLowerCase()}
            </option>
          ))}
        </select>
        <br /><br/>
       
        <button type="submit">Submit</button>
        <br />
        <br />
  
      </form>
      {formik.errors && (
        <div className="errors">
          <ul>
            {Object.values(formik.errors).map((error, index) => (
              <h6 key={index} style={{ color: 'red' }}>{error}</h6>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Create;