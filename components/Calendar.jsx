import React from 'react';

export default class Calendar extends React.Component {
  componentDidMount() {
    $(document).ready(() => {
      $('#calendar').fullCalendar({
        editable: false, // Don't allow editing of events
        handleWindowResize: true,
        weekends: false, // Hide weekends
        defaultView: 'agendaWeek', // Only show week view
        header: false, // Hide buttons/titles
        minTime: '07:30:00', // Start time for the calendar
        maxTime: '22:00:00', // End time for the calendar
        columnFormat: 'ddd',
        displayEventTime: true, // Display event time
        allDaySlot: false, // Get rid of "all day" slot at the top
        height: 'auto' // Get rid of  empty space on the bottom
      });
    });
  }

  render() {
    return (
      <div id="calendar"></div>
    );
  }
}
