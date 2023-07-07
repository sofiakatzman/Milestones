import { useEffect, useState } from "react"

function Friends(){

    const [friends, setFriends] = useState(null)

    useEffect(()=> {
        fetch("http://127.0.0.1:5000/friends")
        .then(r => r.json()).then(data => setFriends(data))
    })




    return(
        <>
        <h1>These are all of your friends!</h1>

        {friends && friends.map(friend => {
            return(
                <div>
                Friend Username: {friend.friend.username} <br/>
                Friend Birthday: {friend.friend.birthday} <br/> <br/>
                </div>
            )
        })}
        </>
    )
}

export default Friends