import React from 'react';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.updateEvents = this.updateEvents.bind(this);
  }
  componentDidMount() {
    if (this.props.hoverSection) {
      this.updateEvents(this.props.coursecomps.concat(this.props.hoverSection));
    } else if (this.props.hoverComponent) {
      this.updateEvents(this.props.coursecomps.concat(this.props.hoverComponent));
    } else {
      this.updateEvents(this.props.coursecomps);
    }
  }
  componentDidUpdate() {
    if (this.props.hoverSection) {
      this.updateEvents(this.props.coursecomps.concat(this.props.hoverSection));
    } else if (this.props.hoverComponent) {
      this.updateEvents(this.props.coursecomps.concat(this.props.hoverComponent));
    } else {
      this.updateEvents(this.props.coursecomps);
    }
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
      events,
      eventRender: (event, element) => {
        $(element).css('cursor', 'pointer'); // Make events look clickable
      },
      eventClick: (event) => {
        const selected = {};
        // Find the corresponding event from the state arrays
        this.props.sections.forEach((section) => {
          if (section.id === event.id) selected.section = section;
        });
        this.props.components.forEach((component) => {
          if (component.id === event.id) selected.component = component;
        });
        this.props.selectEvent(selected);
      }
    });
  }
  render() {
    return <div id="calendar"></div>;
  }
}

Calendar.propTypes = {
  coursecomps: React.PropTypes.arrayOf(React.PropTypes.object),
  selectEvent: React.PropTypes.func,
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  components: React.PropTypes.arrayOf(React.PropTypes.object)
};
