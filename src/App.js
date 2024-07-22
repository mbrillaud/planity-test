import React from 'react';
import Calendar from './components/Calendar';

// Array of events provided for testing
const events = [
  { id: 1, start: '15:00', duration: 90 },
  { id: 2, start: '15:30', duration: 120 },
  { id: 3, start: '16:00', duration: 60 },
  { id: 4, start: '10:00', duration: 60 },
  { id: 5, start: '11:00', duration: 30 },
  { id: 6, start: '11:15', duration: 45 },
];

function App() {
  return (
    <div className="App">
      <Calendar events={events} />
    </div>
  );
}

export default App;
