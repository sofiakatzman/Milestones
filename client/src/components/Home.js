import Authentication from "./Authentication"
import FriendMilestones from "./FriendMilestones"
import Milestones from "./Milestones"

function Home({updateUser, user_id}){

    return (
        <>
        <Milestones user_id={user_id}/>
        </>
    )
}

export default Home




