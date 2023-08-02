import { Link } from 'react-router-dom' 
import NavBar from './NavBar'
import {React, useState} from 'react'

function Navigation() {
  const [navExpanded, setNavExpanded] = useState(false)

  const hideOnClick = ()=> {
    setNavExpanded(!navExpanded)
  }
  return (
    <>
 
    <NavBar side='right' bgColor='black' burgerSize={30} hamColorClosed='black' hamColorOpen='white' navExpanded={navExpanded} setNavExpanded={setNavExpanded}> 
      <div className="links"> 
        <Link onClick={hideOnClick} to="/">home</Link><br />
        <Link onClick={hideOnClick} to="/friends">friends</Link><br />
        <Link onClick={hideOnClick} to="/create">new milestone</Link><br />
        <Link onClick={hideOnClick} to="/aspects">new aspects</Link> <br/>
        <Link onClick={hideOnClick} to="/settings">user settings</Link><br />
        </div>
    </NavBar> </>
  ) 
}

export default Navigation 