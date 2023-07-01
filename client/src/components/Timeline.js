import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Icon from './Icon';

function TimelineComponent({ data }) {
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
          icon={<Icon type={data.aspect_id} />}
        >
          <h3 className="vertical-timeline-element-title">{data.header}</h3>
          <h4 className="vertical-timeline-element-subtitle">{data.subheader}</h4>
          <p>{data.description}</p>
        </VerticalTimelineElement>
      }
    </>
  );
}

export default TimelineComponent;