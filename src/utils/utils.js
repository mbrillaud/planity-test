import _ from 'lodash';

// Function to arrange events without overlapping
export const arrangeEvents = (events, calendarHeight) => {
    // Constants
    const MINUTES_IN_DAY = 12 * 60; // Total minutes from 09:00 to 21:00 (12 hours)

    // Convert event times to minutes and calculate end times
    let positionedEvents = events.map(event => ({
        ...event,
        startInMinutes: timeToMinutes(event.start),
        endInMinutes: timeToMinutes(event.start) + event.duration,
    }));

    // Sort events by start time
    positionedEvents = _.sortBy(positionedEvents, ['startInMinutes']);

    // Determine overlaps and allocate events into columns
    let columns = [];
    positionedEvents.forEach(event => {
        let placed = false;
        for (let i = 0; i < columns.length; i++) {
            // Check if the current column has no overlapping events with the current event
            if (!columns[i].some(e => overlaps(e, event))) {
                columns[i].push(event);
                placed = true;
                event.columnIndex = i; // Assign column index to event
                break;
            }
        }
        // If the event could not be placed in any existing column, create a new column
        if (!placed) {
            event.columnIndex = columns.length;
            columns.push([event]);
        }
    });

    // Calculate the total number of columns for each event
    const eventsWithColumnCount = positionedEvents.map(event => {
        // Count the number of overlapping events
        const overlappingEvents = positionedEvents.filter(e => overlaps(e, event));
        // Find the maximum number of columns needed and set the column count for the event
        event.columnCount = _.max(overlappingEvents.map(e => columns.findIndex(col => col.includes(e)) + 1)) || 1;
        return event;
    });

    // Calculate positions and dimensions for display
    return eventsWithColumnCount.map(event => {
        const columnWidth = 100 / event.columnCount; // Calculate column width as a percentage
        return {
            ...event,
            // Convert start time to pixel position (top)
            top: (event.startInMinutes - (9 * 60)) * (calendarHeight / MINUTES_IN_DAY),
            // Convert duration to pixel height
            height: event.duration * (calendarHeight / MINUTES_IN_DAY),
            // Set width as a percentage based on the number of columns
            width: `${columnWidth}%`,
            // Set horizontal position based on column index
            left: `${columnWidth * event.columnIndex}%`,
        };
    });
};

// Helper function to convert time in "HH:MM" format to minutes
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to determine if two events overlap
const overlaps = (event1, event2) => {
    return event1.startInMinutes < event2.endInMinutes && event2.startInMinutes < event1.endInMinutes;
};
