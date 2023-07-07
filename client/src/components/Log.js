import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Log({ updateUser, user, handleLogout }) {
  // const navigate = useNavigate()

  const handleLogin = () => {
    // Perform the login request to your backend API
    // fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify("test")
    // })
    //   .then((response) => {
    //     console.log("Hey sof you clicked this")
    //     if (response.ok) {
    //       return response.json()
    //     } else {
    //       throw new Error('Oops! That is not quite right!')
    //     }
    //   })
    //   .then((data) => {

    //     updateUser(data.user)
    //     // navigate('/timeline')
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }

  return (
    <div className='log'>
      {user && (
        <button onClick={console.log("hi")}>login</button>
      ) }
    </div>
  )
}

export default Log