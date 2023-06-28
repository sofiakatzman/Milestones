import React from "react";
import Milestones from "./Milestones";

function Home(){

    return(
        <>
        <h1>Welcome to milestones!</h1>
        <button>LOGIN</button>
        <button>NEW USER</button>

        <h1><u>If logged in: </u></h1>
        <Milestones/>
        </>
    )
}

export default Home