import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation'
import Home from './Home'
import Friends from './Friends'
import Create from './Create'
import Settings from './Settings'
import Milestones from './Milestones'
import Log from './Log'
import FriendMilestones from './FriendMilestones'
import Authentication from './Authentication'
import Aspects from './Aspects'
import './index.css'
import UserContext from './UserContext'

function App() {
  const { user, updateUser } = useContext(UserContext)

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
    <div>
      <Router>
        <Log updateUser={updateUser} />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/aspects" element={<Aspects/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/timelines" element={<Milestones/>}/>
          <Route path="/timelines/:user_id" element={<FriendMilestones/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
