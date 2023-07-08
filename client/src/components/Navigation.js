import { Link } from 'react-router-dom' 
import Log from './Log'
import ReactDOM from 'react-dom/client'
import NavBar from './NavBar'
import React from 'react';

function Navigation({updateUser, user}) {
  return (
    <>
     <React.StrictMode>
    <NavBar side='right' bgColor='black' burgerSize={30} hamColorClosed='black' hamColorOpen='white'> 
    <Log updateUser={updateUser} user={user}/>
      <div className="links"> 
        <Link to="/">home</Link><br />
        <Link to="/friends">friends</Link><br />
        <Link to="/create">new</Link><br />
        <Link to="/settings">settings</Link><br />
        </div>
    </NavBar></React.StrictMode> </>
  ) 
}

export default Navigation 