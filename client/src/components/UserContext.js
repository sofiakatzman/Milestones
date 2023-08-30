import React, { createContext, useState, useEffect } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/api/authorized')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setUser(null)
        }
      })
      .then(data => {
        setUser(data) // Set the fetched user data
      })
      .catch(error => {
        console.error("Error fetching user:", error)
        setUser(null)
      })
  }, [])

  // Function to update the user data
  const updateUser = (userData) => {
    setUser(userData)
  }

  // Return the UserContext Provider with the user and updateUser in value
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext