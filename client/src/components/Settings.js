import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'

function Settings() {
  const navigate = useNavigate()
  const { user, updateUser } = useContext(UserContext)
  const [username, setUsername] = useState(user ? user.username : '')
  const [editable, setEditable] = useState({
    username: false,
  })

  const formSchema = yup.object().shape({
    username: yup.string().required('Please enter a new username if you would like to change yours.'),
  })

  const formik = useFormik({
    initialValues: {
      username: username, 
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: values.username }), 
      })
        .then((response) => {
          if (response.ok) {
            console.log(`User ${user.id} has been updated.`)
            setUsername(values.username)
            user.username = values.username
            updateUser(user)
            setEditable({
              username: false,
            })
            // navigate('/')
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
    fetch(`/api/users/${userID}`, {
        method: "DELETE"
      })
        .then((response) => {
          if (response.status === 204){
            console.log(`User ${user.id} has been deleted.`)
            fetch("/api/logout", {
              method: 'DELETE'})
            .then(res => {
              if (res.status === 204){
                updateUser(null)
                navigate('/')
              }})
          } else {
            console.error("Failed to delete user.")
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error)
        })
    
  }

  return (
    <>
      <h1>edit user settings</h1>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <label>current username : {username} </label> 
        {editable.username ? (
          <>
            <input
              type="text"
              name="username"
              placeholder="new username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <br/><button type="button" onClick={() => toggleEditable('username')}>
              cancel 
            </button>
          </>
        ) : (
          <>
            <span>{formik.values.username}</span><br/>
            <button type="button" onClick={() => toggleEditable('username')}>
              edit
            </button>
          </>
        )}

        {editable.username ? (
          <button type="submit">save changes</button> 
        ) : null}<br/><br/>
         <button type="button" className="delete-account" onClick={()=>deleteAccount(user.id)}>DELETE ACCOUNT</button><br/><br/>
      </form>
      <div className="errors">
          <ul>
            {Object.values(formik.errors).map((error, index) => (
              <h6 key={index} style={{ color: 'red' }}>{error}</h6>
            ))}
          </ul>
        </div>
    </>
  )
}

export default Settings