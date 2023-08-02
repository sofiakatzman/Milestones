import Milestones from "./Milestones"
import UserContext from './UserContext'
import { useContext } from "react"

function Home(){
    const {user} = useContext(UserContext)
    const user_id = user.id

    return (
        <>
        <Milestones user_id={user_id}/>
        </>
    )
}

export default Home




