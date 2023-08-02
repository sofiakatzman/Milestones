import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation'
import Home from './Home'
import Friends from './Friends'
import Aspects from './Aspects'
import Create from './Create'
import Settings from './Settings'
import Milestones from './Milestones'
import FriendMilestones from './FriendMilestones'
import Authentication from './Authentication'
import '../index.css'
import UserContext from './UserContext'
import Log from './Log'

function App() {
  const { user } = useContext(UserContext)
  const [blur, setBlur] = useState(false)

  const handleBlur = (isBlurred) => {
    setBlur(isBlurred)
  }

  // Only displays the authentication page if user is not logged in
  if (!user) {
    return (
      <>
        <Router>
          <Authentication/>
        </Router>
        <img
          className="title-bg"
          src="https://i.ibb.co/3FssgfK/milestones-logo-green.png"
          alt="milestones-logo"
        />
      </>
    )
  }

  return (
    <div >
      <Router>
        
        <Navigation handleBlur={handleBlur}/>
        <div className={blur ? 'blur-active' : ''}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/aspects" element={<Aspects/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/timelines" element={<Milestones/>}/>
          <Route path="/timelines/:user_id" element={<FriendMilestones/>} />
          <Route path="/user/logout" element={<Log />} />
        </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App