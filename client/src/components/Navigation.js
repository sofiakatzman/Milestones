import { Link } from 'react-router-dom' 
import Log from './Log'

function Navigation({updateUser, user}) {
  return (
    <>
    <nav className="navbar">
    <Log updateUser={updateUser} user={user}/>
      <h1 className="icon">☲</h1>
      <div className="links">
        <Link to="/">home</Link><br />
        <Link to="/friends">friends</Link><br />
        <Link to="/create">new</Link><br />
        <Link to="/settings">settings</Link><br />
      </div>
    </nav></>
  ) 
}

export default Navigation 