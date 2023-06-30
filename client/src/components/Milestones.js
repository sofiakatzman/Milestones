import { VerticalTimeline}  from 'react-vertical-timeline-component';
import TimelineComponent from "./Timeline";

{/* Filter Key : this needs to be turned into a component: 
================> each logo will be in its own circle, that will gray out when not selected and get large when hovered and stays large and with color if clicked - TBD css & react comp.
💼 - professional : work experience 
✏️ - education : schooling 
🌱 - self growth : self improvement 
🏆 - achievement : personal goal achievments 
✈️ - big move : relocation or big life changes

* below is placeholder
*/}


function Milestones(){


    return(
        <>
        {/* <div className="filters" >
            💼  ✏️  🌱  🏆  ✈️
            <br/><br/>
        </div> */}

        <VerticalTimeline>
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
            <TimelineComponent />
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