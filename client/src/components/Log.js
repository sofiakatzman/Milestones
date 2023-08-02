import { useNavigate } from 'react-router-dom'

function Log({updateUser, user, handleBlur}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch("http://127.0.0.1:5000/logout", {
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