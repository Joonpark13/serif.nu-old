import React from 'react';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.updateEvents = this.updateEvents.bind(this);
  }
  componentDidMount() {
    this.updateEvents(this.props.coursecomps);
  }
  componentDidUpdate() {
    this.updateEvents(this.props.coursecomps);
  }
  updateEvents(events) {
    $('#calendar').fullCalendar('destroy'); // Make sure it resets before every load
    $('#calendar').fullCalendar({
      editable: false, // Don't allow editing of events
      weekends: false, // Hide weekends
      defaultView: 'agendaWeek', // Only show week view
      header: false, // Hide buttons/titles
      minTime: '07:30:00', // Start time for the calendar
      maxTime: '22:00:00', // End time for the calendar
      columnFormat: 'ddd',
      allDaySlot: false, // Get rid of "all day" slot at the top
      height: 'auto', // Get rid of  empty space on the bottom
      events
    });
  }
  render() {
    console.log(this.props.coursecomps);
    return <div id="calendar"></div>;
  }
}
