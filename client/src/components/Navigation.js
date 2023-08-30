import { Link } from 'react-router-dom' 
import {React, useState, useContext} from 'react'
import UserContext from './UserContext'
import NavBar from './NavBar'
import Log from './Log'


function Navigation({ handleBlur }) {
  const [navExpanded, setNavExpanded] = useState(false)
  const {updateUser, user} = useContext(UserContext)

  const hideOnClick = ()=> {
    setNavExpanded(!navExpanded)
    handleBlur(!navExpanded)
  }

  return (
    <>
 
    <NavBar side='right' handleBlur={handleBlur} bgColor='black' burgerSize={30} hamColorClosed='black' hamColorOpen='white' navExpanded={navExpanded} setNavExpanded={setNavExpanded}> 
    <h4 className="greeting">hello, {user.username}</h4>
      <div className="links"> 
        <Link onClick={hideOnClick} to="/">home</Link> <br/>
        <Link onClick={hideOnClick} to="/feed">feed</Link> <br/>
        <Link onClick={hideOnClick} to="/friends">friends</Link> <br/>
        <Link onClick={hideOnClick} to="/create">new milestone</Link> <br/>
        <Link onClick={hideOnClick} to="/aspects">new aspects</Link> <br/>
        <Link onClick={hideOnClick} to="/settings">user settings</Link> <br/>

        
        </div>

        <Log updateUser={updateUser} handleBlur={handleBlur} />
    </NavBar> </>
  ) 
}

export default Navigation 