import { useNavigate } from 'react-router-dom'

function Log({updateUser, user}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch("http://127.0.0.1:5000/logout", {
      method: 'DELETE'})
    .then(res => {
      if(res.ok){
        updateUser(null)
        navigate('/')
      }

    })
    
    
  }

  return (
    <div className='log'>
      {user ? 
        <button onClick={()=>navigate('/')}>login</button> : <button onClick={()=>handleLogout()}>logout</button> 
       }
    </div>
  )
}

export default Log