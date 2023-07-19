import React from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom"

function Aspects(){
  const navigate = useNavigate()
  const formSchema = yup.object().shape({
        name: yup.string().required('Must enter a header'),
        // Add validation for other fields if needed
      })
    
      const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
          icon: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('http://127.0.0.1:5000/aspects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if (res.ok) {
              res.json().then((aspect) => {
                console.log(`aspect : ${aspect}, has been created. `)
                navigate('/')
              })
            }
          })
        },
      })
    return(
        <>
        <h1>create new aspects</h1>
    
        <form className="aspects-form" 
        onSubmit={formik.handleSubmit}>
          
        <label>Aspect Name</label> <br/>
        <input type="text" 
        name="name" 
        value={formik.values.name} 
        onChange={formik.handleChange} />
        <br/>

        <label>Aspect Description</label> <br/>
        <input type="text" 
          name="description" 
          value={formik.values.description} 
          onChange={formik.handleChange} />
        <br/>

        <label>Aspect Icon</label> <br/>
        <textarea type="text" 
          name="icon" 
          value={formik.values.icon} 
          onChange={formik.handleChange} />
        <br/>

        <p className="errors">{formik.errors.header}</p>
        <button type="submit">Submit</button>
        </form>

        </>
    )
}

export default Aspects