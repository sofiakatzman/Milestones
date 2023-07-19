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
import Authentication from "./Authentication"
import Aspects from "./Aspects"

function App() {
  const [user, setUser] = useState(null)
  const [user_id, setUserID] = useState(0)

  //checks if user is authorized 
  useEffect(()=>{
    fetch('http://localhost:5000/authorized')
    .then(res => {
      if(res.ok){
        res.json().then(user => {
          setUser(user)
          setUserID(user.id)
        })
      }else {
        setUser(null)
      }
    })
  },[])
  
  //adds user.id to state so that user data doesnt always need to be passed down 
  const updateUser = (update) => {
    setUser(update)
    if (update!= null){
      setUserID(update.id)
    }
  }
  //only displays the authentication page if user is not logged in 
  if(!user)
    return(
      <>
      <Router>
        <Authentication updateUser={updateUser} />
      </Router>
      </>
  )
  return (
    <div>
      <Router>
      <Log updateUser={updateUser} /> 
        <Navigation />
        <Routes>
          <Route path="/" element={<Home updateUser={updateUser} user_id={user_id}/>} />
          <Route path="/friends" element={<Friends user_id={user_id}/>} />
          <Route path="/create" element={<Create user_id={user_id}/>} />
          <Route path="/aspects" element={<Aspects />} />
          <Route path="/settings" element={<Settings user={user} updateUser={updateUser}/>} />
          <Route path="/timelines" element={<Milestones updateUser={updateUser} user={user} />} />
          <Route path="/timelines/:user_id" element={<FriendMilestones user={user}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

