import React from 'react';
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import { List } from 'immutable';

import '../stylesheets/materialFullCalendar.css';

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
      events,
      eventRender: (event, element) => {
        $(element).css('cursor', 'pointer'); // Make events look clickable
      },
      eventClick: (event) => {
        const selected = {};
        // Find the corresponding event from the state arrays
        this.props.sections.map(section => {
          if (section.get('id') === event.id) selected.section = section.toJS();
        });
        this.props.components.map(component => {
          if (component.get('id') === event.id) selected.component = component.toJS();
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
  sections: React.PropTypes.instanceOf(List),
  components: React.PropTypes.instanceOf(List)
};
