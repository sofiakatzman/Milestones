import React from "react";
import { VerticalTimeline}  from 'react-vertical-timeline-component';
import TimelineComponent from "./Timeline";

function Milestones(){

    return(
        <>
        <VerticalTimeline>
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
        </VerticalTimeline>
        </>
    )
}

export default Milestones