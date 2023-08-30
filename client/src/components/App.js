import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'
import Navigation from './Navigation'
import Home from './Home'
import Friends from './Friends'
import Aspects from './Aspects'
import Create from './Create'
import Settings from './Settings'
import Milestones from './Milestones'
import FriendMilestones from './FriendMilestones'
import Authentication from './Authentication'
import UserContext from './UserContext'
import Log from './Log'
import LiveFeed from './LiveFeed'
import EditMilestone from './EditMilestone'
import '../index.css'

const socket = io('/')

function App() {
  const { user } = useContext(UserContext)
  const [blur, setBlur] = useState(false)
  const [broadcast, setBroadcast] = useState([])

  const handleBlur = (isBlurred) => {
    setBlur(isBlurred)
  }

  useEffect(() => {
    const socket = io('/')
    socket.on('connect', () => {
      console.log('Connected to server!')
    })
    socket.on('new_milestone', (data) => {
      console.log('Received new milestone:', data)
      setBroadcast((prevBroadcast) => [data, ...prevBroadcast])
    })
    }, [])

    const exitSocket = () => {
      socket.disconnect()
    }

  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    // Fetch all previous milestones only once during the initial rendering
    fetch('/api/milestones')
      .then((r) => r.json())
      .then((data) => {
        // Sort the milestones based on their milestone_id in descending order
        const sortedData = data.sort((a, b) => b.id - a.id);
        setMilestones(sortedData);
      });
  }, []);


  // Only displays the authentication page if user is not logged in
  if (!user) {
    return (
      <>
        <Router>
          <Authentication />
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
        <Navigation handleBlur={handleBlur} />
        <div className={blur ? 'blur-active' : ''}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="feed" element={<LiveFeed broadcast={broadcast} setBroadcast={setBroadcast} milestones={milestones}/>} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/create" element={<Create />} />
            <Route path="/aspects" element={<Aspects />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/timelines" element={<Milestones />} />
            <Route path="/edit/milestone/:milestoneId" element={<EditMilestone />} />
            <Route path="/timelines/:user_id" element={<FriendMilestones />} />
            <Route path="/user/logout" element={<Log exitSocket={exitSocket}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
