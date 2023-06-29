import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


/*
iconColor = color of milestone icon 
mainHeader = main title header
subHeader = subheader
description = milestone discription
milestoneDate = date of milestone
iconPicture = display emoji for that milestone

*/

function TimelineComponent(){
    let iconColor = { background: "white", color: "white"}
    let mainHeader = "Hello Sofia"
    let subHeader = "Fuzz was here"
    let description = "blah blah blah ipsum impsum blah"
    let milestoneDate = "July 15, 2023"
    let iconPicture = <h3>/-.💼</h3>
    return(       
          <VerticalTimelineElement
            className="education"//type of milestone
            contentStyle={{ background: "white", color: 'gray' }} //milestone background
            contentArrowStyle={{ borderRight: '15px solid white' }} //arrow pointing towards date
            date={milestoneDate}
            iconStyle={iconColor} 
            icon={iconPicture}
          >
            <h3 className="vertical-timeline-element-title">{mainHeader}</h3>
            <h4 className="vertical-timeline-element-subtitle">{subHeader}</h4>
            <p>{description}</p>
          </VerticalTimelineElement>
    )
}

export default TimelineComponent
