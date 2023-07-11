import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'

function Settings() {
  
  const [editable, setEditable] = useState({
    username: false,
    birthday: false,
    // password: false,
  })

  const formSchema = yup.object().shape({
    username: yup.string().required('Please enter a username'),
    // password: yup.string().required('Please enter a password'),
    birthday: yup.date().required('Please enter your birthdate.'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      birthday: '',
      // password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values)
      // Make separate fetch requests to patch individual fields based on logged in user's id
      if (editable.username) {
        // fetch request to update username
      }
      // if (editable.password) {
      //   // fetch request to update password
      // }
      if (editable.birthday) {
        // fetch request to update birthday
      }
    },
  })

  const toggleEditable = (field) => {
    setEditable((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  const deleteAccount = () => {
    //add css to this button so its red and an erro
    //function will delete user account -> send delete request to user 
    
  }
  return (
    <>
      <h1>User settings...</h1>
      {/* <h2>Hello, {user.username}</h2> */}
      <form onSubmit={formik.handleSubmit}>
        <label>Username </label>
        {editable.username ? (
          <>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <button type="button" onClick={() => toggleEditable('username')}>
              Cancel 
            </button>
          </>
        ) : (
          <>
            <span>{formik.values.username}</span>
            <button type="button" onClick={() => toggleEditable('username')}>
              Edit
            </button>
          </>
        )}
        <br />
        <br />
        {/* <label>Password </label>
        {editable.password ? (
          <>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <button type="button" onClick={() => toggleEditable('password')}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{formik.values.password}</span>
            <button type="button" onClick={() => toggleEditable('password')}>
              Edit
            </button>
          </>
        )}
        <br />
        <br /> */}
        <label>Birthdate </label>
        {editable.birthday ? (
          <>
            <input
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
            />
            <button type="button" onClick={() => toggleEditable('birthday')}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{formik.values.birthday}</span>
            <button type="button" onClick={() => toggleEditable('birthday')}>
              Edit
            </button>
          </>
        )}
        <br />
        <br />
        {/* {editable.username || editable.password || editable.birthday ? (
          <button type="submit">Save Changes</button>
        ) : null} */}
        <button className="delete" onClick={deleteAccount}>DELETE ACCOUNT</button>
      </form>
    </>
  )
}

export default Settings