import Authentication from "./Authentication"
import Milestones from "./Milestones"

function Home({updatedUser}){
    return (
        <>
        <Authentication updateUser={updatedUser}/> 
        </>
    )
}

export default Home




