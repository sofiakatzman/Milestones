import React from 'react';
import styled from 'styled-components';
import { useFormik, Form } from 'formik';
import * as yup from 'yup';

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
    onSubmit: (values) => 
    
    console.log(values)
    
    // {
    //   fetch('/http://127.0.0.1:5000/milestones', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values, null, 2),
    //   }).then((res) => {
    //     if (res.ok) {
    //       res.json().then((milestone) => {
    //         console.log(milestone);
    //       });
    //     }
    //   });
    // },
  });

  return (
    
      <form onSubmit={console.log(formik.values)}>
        <label>Header</label>
        <input type="text" name="header" value={formik.values.header} onChange={formik.handleChange} />

        <label>Subheader</label>
        <input type="text" name="subheader" value={formik.values.subheader} onChange={formik.handleChange} />

        <label>Description</label>
        <input type="number" name="description" value={formik.values.description} onChange={formik.handleChange} />

        <label>Date</label>
        <input type="text" name="date" value={formik.values.date} onChange={formik.handleChange} />

        <label>Aspect</label>
        <input type="text" name="aspect_id" value={formik.values.aspect_id} onChange={formik.handleChange} />

        <label>Private?</label>

        <label>User ID</label>
        <textarea type="text" rows="4" cols="50" name="user_id" value={formik.values.user_id} onChange={formik.handleChange} />

        <input type="submit" />
      </form>

  );
}

export default Create;
