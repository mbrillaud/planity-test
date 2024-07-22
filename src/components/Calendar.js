import React from 'react';
import Event from './Event';
import { arrangeEvents } from '../utils/utils';
import '../css/calendar.css';

const Calendar = ({ events }) => {
  const arrangedEvents = arrangeEvents(events);

  return (
    <div className="calendar">
      {arrangedEvents.map(event => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Calendar;
