import { useHistory } from "react-router-dom";

function Log({updateUser}) {

    const handleLogout = () => {
        fetch("http://127.0.0.1:5555/logout", {
            method: "DELETE"
        })
        .then(r => {
            if (r.ok) {
                console.log("logged out")
                r.json().then(() => {
                    updateUser(null)
               
                })
            }
        })
    }
    
    return (
        <div className='log'> 
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}

export default Log