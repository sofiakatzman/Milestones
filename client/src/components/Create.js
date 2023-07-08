import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

function Create() {
  const formSchema = yup.object().shape({
    header: yup.string().required('Must enter a header'),
    aspect_id: yup.number().positive(),
    // Add validation for other fields if needed
  });

  const formik = useFormik({
    initialValues: {
      header: '',
      subheader: '',
      description: '',
      date: '',
      aspect_id: '',
      is_private: '',
      user_id: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => { 
      console.log(values);
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
          });
        }
      });
    },
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    formik.setFieldValue(name, checked)
  };
  
  return (
    <>
    <h1>create a new milestone</h1>
    <form className="create-milestone-form" 
      onSubmit={formik.handleSubmit}>
      <label>Header</label> <br/>
      <input type="text" 
        name="header" 
        value={formik.values.header} 
        onChange={formik.handleChange} />
      <br/>
      <label>Subheader</label> <br/>
      <input type="text" 
        name="subheader" 
        value={formik.values.subheader} 
        onChange={formik.handleChange} />
      <br/>
      <label>Description</label> <br/>
      <textarea type="text" 
        name="description" 
        value={formik.values.description} 
        onChange={formik.handleChange} />
      <br/>
      <label>Date</label> <br/>
      <input type="date" 
        name="date" 
        value={formik.values.date} 
        onChange={formik.handleChange} />
      <br/>
      <label>Aspect</label> <br/>
      <input type="text" 
        name="aspect_id" 
        value={formik.values.aspect_id} 
        onChange={formik.handleChange} />
      <br/>
      <label>Private?</label> <br/> 
      <input
        type="checkbox"
        name="is_private"
        checked={formik.values.is_private}
        onChange={handleCheckboxChange}
      /> 
      <br/>
      <label>User ID</label> <br/>
      <input type="number" 
        name="user_id" 
        value={formik.values.user_id} 
        onChange={formik.handleChange} />
      <br/>
      <p className="errors">{formik.errors.header}</p>
      <button type="submit">Submit</button>
    </form></>
  );
}

export default Create;
