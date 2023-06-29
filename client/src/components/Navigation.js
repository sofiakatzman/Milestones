import React from "react" 
import { Link } from 'react-router-dom' 

function Navigation() {
  return (
    <>
    <nav className="navbar">
      <h1 className="icon">☰</h1>
      <div className="links">
        <Link to="/">home</Link><br />
        <Link to="/timeline">milestones</Link><br />
        <Link to="/friends">friends</Link><br />
        <Link to="/create">new</Link><br />
        <Link to="/settings">settings</Link><br />

      </div>
    </nav></>
  ) 
}

export default Navigation 