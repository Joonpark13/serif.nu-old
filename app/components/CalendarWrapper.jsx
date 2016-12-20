import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Calendar from './Calendar.jsx';

const style = {
  card: {
    margin: 10
  }
};

const CalendarWrapper = ({ coursecomps, selectEvent, eventOpen, selectedEvent, remove, closeDialog }) => {
  // Take care of unscheduled courses
  const unscheduled = [];
  const scheduled = [];
  coursecomps.forEach((coursecomp) => {
    if (coursecomp.unscheduled) {
      unscheduled.push(coursecomp);
    } else {
      scheduled.push(coursecomp);
    }
  });
  const actions = [
    <FlatButton
      label="Remove"
      primary
      onTouchTap={() => remove(selectedEvent.id)}
    />,
    <FlatButton
      label="Swap Component"
      primary
      // onTouchTap={}
    />,
    <FlatButton
      label="Cancel"
      primary
      // onTouchTap={}
    />
  ];
  return (
    <div>
      <Card style={style.card}>
        <CardText>
          <Calendar coursecomps={scheduled} selectEvent={selectEvent} />
        </CardText>
      </Card>

      <Card style={style.card}>
        <CardTitle title="Unscheduled Courses" />
        <CardText>
          {unscheduled.map((event) => (
            <Card key={event.id}>
              <CardTitle title={event.title} />
            </Card>
          ))}
        </CardText>
      </Card>

      <Dialog
        title={selectedEvent.title}
        actions={actions}
        open={eventOpen}
        onRequestClose={() => closeDialog()}
      >
      </Dialog>
    </div>
  );
};

export default CalendarWrapper;

CalendarWrapper.propTypes = {
  coursecomps: React.PropTypes.arrayOf(React.PropTypes.object),
  eventOpen: React.PropTypes.bool,
  remove: React.PropTypes.func,
  closeDialog: React.PropTypes.func
};
