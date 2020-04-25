import React from 'react';

import EventItem from '../EventItem';
import './index.css';

const EventList = (props) => {
  const events = props.events.map(event => (
    <EventItem
      key={event.id}
      id={event.id}
      title={event.title}
      price={event.price}
      userId={props.authUserId}
      creatorId={event.user.id}
    />
  ));
  return (
    <ul className="event__list">
      { events }
    </ul>
  );
};

export default EventList;
