import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Settings({user, updatedUser}) {
  const navigate = useNavigate()
  const [editable, setEditable] = useState({
    username: false,
    birthday: false,
    // password: false,
  })

  // const formSchema = yup.object().shape({
  //   username: yup.string().required('Please enter a username'),
  // })

  const formik = useFormik({
    initialValues: {
      username: user.username, // Initialize with the current username
    },
    // ... your other formik configurations ...
    onSubmit: (values) => {
      fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: values.username }), // Use formik.values.username
      })
        .then((response) => {
          if (response.ok) {
            console.log(`User ${user.id} has been updated.`)
          } else {
            console.error("Failed to update user.")
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error)
        })
    },
  })

  const toggleEditable = (field) => {
    setEditable((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  const deleteAccount = (userID) => {
    //add css to this button so its red and an erro
    
  }

  const editUsername = (userID, updatedUser) => {
    fetch(`http://localhost:5000/users/${userID}`, { 

    }).then(r=> r.json()).then(res=> console.log(res)) 
  }

  return (
    <>
      <h1>edit user settings</h1>
      {/* <h3>Hello, {user.username}</h3> */}
      <form onSubmit={formik.handleSubmit}>
        <label>username : {user.username} </label> 
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
        {editable.username ? (
          <button type="submit">Save Changes</button> 
        ) : null}<br/>
        <button className="delete" onClick={()=>deleteAccount(user.id)}>DELETE ACCOUNT</button>
      </form>
    </>
  )
}

export default Settings