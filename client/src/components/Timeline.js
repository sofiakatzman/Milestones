import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Icon from './Icon';


/*
iconColor = color of milestone icon 
mainHeader = main title header
subHeader = subheader
description = milestone discription
milestoneDate = date of milestone
iconPicture = display emoji for that milestone

*/

function TimelineComponent({data}){
  let iconColor = { background: "white", color: "white"}

    return( 
      <>     
       {  data && data.milestones.map(milestone => {
        console.log(milestone)
        return (
          <VerticalTimelineElement
                className={milestone.aspect_id}//type of milestone
                contentStyle={{ background: "white", color: 'gray' }} //milestone background
                contentArrowStyle={{ borderRight: '15px solid white' }} //arrow pointing towards date
                date={milestone.milestoneDate}
                iconStyle={iconColor} 
                icon={<Icon type={milestone.aspect_id}/>}
                
              >
                <h3 className="vertical-timeline-element-title">"{milestone.header}"</h3>
                <h4 className="vertical-timeline-element-subtitle">{milestone.subheader}</h4>
                <p>{milestone.description}</p> 
              </VerticalTimelineElement>
        )
      })}
    </>)
}

export default TimelineComponent
