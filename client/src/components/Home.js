import Authentication from "./Authentication"
import Milestones from "./Milestones"

function Home({updateUser}){
    return (
        <>
        <Authentication updateUser={updateUser}/> 
        </>
    )
}

export default Home




