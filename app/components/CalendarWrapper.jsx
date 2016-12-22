import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Calendar from './Calendar.jsx';
import Unscheduled from './Unscheduled.jsx';

const style = {
  card: {
    margin: 10
  }
};

const CalendarWrapper = ({
  coursecomps,
  selectEvent,
  eventOpen,
  selectedEvents,
  remove,
  closeDialog,
  swapComponent,
  sections,
  components,
  hoverSection,
  hoverComponent
}) => {
  // Separate unschedule courses from scheduled ones
  const unscheduled = [];
  const scheduled = [];
  coursecomps.forEach((coursecomp) => {
    if (coursecomp.unscheduled) {
      unscheduled.push(coursecomp);
    } else {
      scheduled.push(coursecomp);
    }
  });
  if (hoverSection) {
    if (hoverSection.unscheduled) unscheduled.push(hoverSection);
    else scheduled.push(hoverSection);
  } else if (hoverComponent) {
    if (hoverComponent.unscheduled) unscheduled.push(hoverComponent);
    else scheduled.push(hoverComponent);
  }
  const selected = selectedEvents.section;
  const component = selectedEvents.component;
  const removeButton = (
    <FlatButton
      label="Remove"
      primary
      onTouchTap={() => remove(selected.id)}
    />
  );
  const cancelButton = (
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={() => closeDialog()}
    />
  );
  const swapButton = (
    <FlatButton
      label="Swap Component"
      primary
      onTouchTap={() => swapComponent(selected.school, selected.subject, selected.course, selected.id)}
    />
  );
  const actions = [];
  actions.push(removeButton);
  if (component) actions.push(swapButton);
  actions.push(cancelButton);
  return (
    <div>
      <Card style={style.card}>
        <CardText>
          <Calendar
            coursecomps={scheduled}
            selectEvent={selectEvent}
            sections={sections}
            components={components}
          />
        </CardText>
      </Card>

      <Card style={style.card}>
        <CardTitle title="Unscheduled Courses" />
        <CardText>
          {unscheduled.map((event) => (
            <Unscheduled
              key={event.id}
              id={event.id}
              title={event.title}
              color={event.color}
              sections={sections}
              components={components}
              selectEvent={selectEvent}
            />
          ))}
        </CardText>
      </Card>

      {selected && ( // Dialog that appears on event select
        <Dialog
          title={`${selected.subject} ${selected.course} ${selected.name}`}
          actions={actions}
          open={eventOpen}
          onRequestClose={() => closeDialog()}
        >
          <p>{selected.meeting_time}</p>
          <p>{selected.instructor.join(', ')}</p>
          {selected.topic && <p>{selected.topic}</p>}
          <p>{selected.overview_of_class}</p>
          <p>ID: {selected.id}</p>
          {component && (
            <div>
              <h4>{selected.component}</h4>
              <p>{selected.meeting_time}</p>
              <p>{selected.room}</p>
            </div>
          )}
        </Dialog>
      )}
    </div>
  );
};

export default CalendarWrapper;

CalendarWrapper.propTypes = {
  coursecomps: React.PropTypes.arrayOf(React.PropTypes.object),
  eventOpen: React.PropTypes.bool,
  remove: React.PropTypes.func,
  closeDialog: React.PropTypes.func,
  swapComponent: React.PropTypes.func,
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  components: React.PropTypes.arrayOf(React.PropTypes.object)
};
