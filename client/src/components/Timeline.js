import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Icon from './Icon'


function TimelineComponent({ data, canDelete, handleDelete, handleEdit}) {
  

  
  return (
    <>
      {data &&
        
          <VerticalTimelineElement 
          key={data.id}
          className={data.aspect_id.toString()}
          contentStyle={{ background: 'white', color: 'gray' }}
          contentArrowStyle={{ borderRight: '15px solid white' }}
          date={data.date}
          iconStyle={{ background: 'white', color: 'white' }}
          icon={<Icon type={data.aspect_id} 
          />}
        >
          
          <br/>
          <h3 className="vertical-timeline-element-title">{data.header}</h3>
          <h4 className="vertical-timeline-element-subtitle">{data.subheader}</h4>
          <h5 className="vertical-timeline-element-description">{data.description}</h5>
          <br/>
          <div className="edit-delete-buttons">
            {canDelete && <button onClick={()=> handleEdit(data.id)}>edit</button>}
            {canDelete && <button onClick={()=> handleDelete(data.id)}>x</button>}
          </div>
        </VerticalTimelineElement>
     }
    </>
  )
}

export default TimelineComponent