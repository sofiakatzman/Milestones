import React from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom"

function Aspects(){
  const navigate = useNavigate()
  const formSchema = yup.object().shape({
        name: yup.string().required('You must enter a name.'),
        description: yup.string().required('You must enter a description.'),
        logo: yup.string().required('You must enter a logo.'),
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
            fetch('/aspects', {
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
        <h1>new aspect</h1>
        <form className="auth-form " 
        onSubmit={formik.handleSubmit}>
        <br/><br/>
        <input type="text" 
        name="name" 
        placeholder="name"
        value={formik.values.name} 
        onChange={formik.handleChange} />
        <br/><br/>
        <input type="text" 
          name="description" 
          placeholder="description"
          value={formik.values.description} 
          onChange={formik.handleChange} />
        <br/><br/>
        <input type="text" 
          name="icon" 
          placeholder="logo"
          value={formik.values.icon} 
          onChange={formik.handleChange} />
        <br/>

        <p className="errors">{formik.errors.header}</p>
        <button type="submit">Submit</button><br/><br/>
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
    )
}

export default Aspects