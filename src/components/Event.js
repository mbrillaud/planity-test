import React from 'react';
import '../css/event.css';

const Event = ({ event }) => {
  const { id, start, duration, top, height, columnCount, columnIndex } = event;

  const style = {
    top: `${top}px`,
    height: `${height}px`,
    width: `${100 / columnCount}%`,
    left: `${(100 / columnCount) * columnIndex}%`
  };

  return (
    <div className="event" style={style}>
      {id} - start : {start}, duration : {duration}
    </div>
  );
};

export default Event;
