import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./Navigation"
import Home from "./Home"
import Friends from "./Friends"
import Create from "./Create"
import Settings from "./Settings"
import Milestones from "./Milestones"
import Log from './Log'
import './index.css'
import { useState } from "react"
import FriendMilestones from "./FriendMilestones"

function App() {
  const [user, updateUser] = useState(null)
  console.log(user)

  return (
    <div>
      <Log updateUser={updateUser} />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
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