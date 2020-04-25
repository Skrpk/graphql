import React from 'react';

import './index.css';

const eventItem = (props) => (
  <li className="events__list-item" key={props.id}>
    <div>
      <h1>{props.title}</h1>
      <h2>{`$${props.price}`}</h2>
    </div>
    <div>
      {
        props.userId === props.creatorId ?
          <p>You're the owner of this event.</p> :
          <button className="btn">View Details</button>
      }

    </div>
  </li>
);

export default eventItem;
