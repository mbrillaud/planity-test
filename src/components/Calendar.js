import React, { useEffect, useState } from 'react';
import Event from './Event';
import { arrangeEvents } from '../utils/eventsHelpers';

// Calendar component
const Calendar = ({ events }) => {
  // State to hold the height of the calendar
  const [calendarHeight, setCalendarHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Handler to update calendar height on window resize
    const handleResize = () => setCalendarHeight(window.innerHeight);

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Arrange events based on the current calendar height
  const arrangedEvents = arrangeEvents(events, calendarHeight);

  return (
    <div className="calendar">
      {/* Render each event */}
      {arrangedEvents.map(event => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Calendar;
