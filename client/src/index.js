import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { UserProvider } from './components/UserContext'
import { createRoot } from "react-dom/client"

const root = createRoot(document.getElementById("root"))
root.render(
  <UserProvider>
    <App />
  </UserProvider>
)