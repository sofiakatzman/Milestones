import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import UserContext from './UserContext'

function Log({handleBlur}) {
  const navigate = useNavigate()
  const {updateUser} = useContext(UserContext)

  const handleLogout = () => {
    fetch("/api/logout", {
      method: 'DELETE'})
    .then(res => {
      if(res.ok){
        updateUser(null)
        handleBlur(false)
        navigate('/')
      }
    })
  }

  return (
    <div className='log'>
            <button className="logout" onClick={()=>handleLogout()}>logout</button>  
    </div>
  )
}

export default Log