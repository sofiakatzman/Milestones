import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./Navigation"
import Home from "./Home"
import Friends from "./Friends"
import Create from "./Create"
import Settings from "./Settings"
import Milestones from "./Milestones"
import Log from './Log'
import './index.css'
import { useEffect, useState } from "react"
import FriendMilestones from "./FriendMilestones"

function App() {
  const [user, setUser] = useState(null)
  console.log(user)

  useEffect(()=>{
    fetchUser()
  },[])
  
  const updateUser = (update) => {
    setUser(update)
  }

  const fetchUser = () => {
    fetch('http://localhost:5000/authorized')
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      }else {
        setUser(null)
      }
    })
}




  return (
    <div>
      <Log updateUser={updateUser} />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home updatedUser={updateUser}/>} />
          <Route path="/friends" element={<Friends user={user} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/timelines" element={<Milestones />} />
          <Route path="/timelines/:user_id" element={<FriendMilestones />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App