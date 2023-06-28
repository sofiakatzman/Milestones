import React from "react"
import { Link } from 'react-router-dom'

function Navigation(){
    return(
        <nav className="links">
            <Link to="/">home</Link><br/>
            <Link to="/friends">friends</Link><br/>
            <Link to="/create">new milestone</Link><br/>
            <Link to="/settings">settings</Link><br/>
        </nav>
    )


}




export default Navigation 