import Authentication from "./Authentication"
import FriendMilestones from "./FriendMilestones"
import Milestones from "./Milestones"

function Home({updateUser, user_id}){

    return (
        <>
        Hello! Welcome to your timeline. <br/> These are your current milestones...
        <Milestones user_id={user_id}/>
        </>
    )
}

export default Home




