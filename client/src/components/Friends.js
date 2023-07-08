import { useEffect, useState } from "react"

function Friends(){

    const [friends, setFriends] = useState(null)

    useEffect(()=> {
        fetch("http://127.0.0.1:5000/friends")
        .then(r => r.json()).then(data => setFriends(data))
    }, [])


    return(
        <>
        <h1>FRIENDS</h1>
        <div className="cards"> 
        {friends && friends.map(friend => { 
            return(
                <div className='card'> 
                <img src="https://www.nicepng.com/png/full/12-120709_png-file-human-icon-png.png"></img>
                <span> {friend.friend.username}</span>             
                <p classname="birthday"> {friend.friend.birthday} </p>
                </div>
            )
        })}
        </div>
        </>
    )
}

export default Friends