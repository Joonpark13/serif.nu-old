import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List } from 'immutable';

import Calendar from './Calendar.jsx';
import Unscheduled from './Unscheduled.jsx';
import CalendarHeader from './CalendarHeader.jsx';

const style = {
  card: {
    margin: 10
  },
  dialogContent: {
    marginTop: '24px'
  }
};

const matchId = (id) => (
  (component) => (id === component.get('id'))
);

const CalendarWrapper = ({
  currentTerm,
  coursecomps,
  selectEvent,
  eventOpen,
  selectedEvents,
  currentCalendarName,
  currentTermName,
  remove,
  closeDialog,
  swapComponent,
  sections,
  components,
  hoverSection,
  hoverComponent,
  setCalendarName,
  handleAuth,
  facebookPosted,
  regalSent,
  hasRegal,
  customEvents
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
  // Add hover classes to appropriate lists
  if (hoverSection) {
    if (hoverSection.unscheduled) unscheduled.push(hoverSection);
    else scheduled.push(hoverSection);
  } else if (hoverComponent) {
    if (hoverComponent.unscheduled) unscheduled.push(hoverComponent);
    else scheduled.push(hoverComponent);
  }

  let selected;
  let selectedComponent;
  let selectedType;
  if (selectedEvents.get('section')) {
    selectedType = 'coursecomp';
    selected = selectedEvents.get('section').toJS();
    if (selectedEvents.get('component')) {
      selectedComponent = selectedEvents.get('component').toJS();
    }
  } else if (selectedEvents.get('customEvent')) {
    selectedType = 'customEvent';
    selected = selectedEvents.get('customEvent').toJS();
  }
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
      onTouchTap={() => swapComponent(currentTerm, selected.school, selected.subject, selected.course, selected.id)}
    />
  );
  // Prepare action buttons for event click dialog
  const actions = [];
  actions.push(removeButton);
  // Swap components button only available if clicked class has components
  if (selectedComponent) actions.push(swapButton);
  actions.push(cancelButton);

  const component = selected ? components.filter(matchId(selected.id)).toJS()[0] : null;
  let courseDesc;
  if (selected) {
    const descriptions = selected.overview_of_class ? selected.overview_of_class.split('<br/>') : ['No description available.'];
    courseDesc = descriptions.map((desc, index) => <span key={index}>{desc}<br /></span>);
  }

  return (
    <div>
      <Card style={style.card}>
        <CardText>
          <CalendarHeader
            currentCalendarName={currentCalendarName}
            setCalendarName={setCalendarName}
            handleAuth={handleAuth}
            hasClasses={sections.size !== 0}
            currentTermName={currentTermName}
            facebookPosted={facebookPosted}
            sections={sections}
            components={components}
            regalSent={regalSent}
            hasRegal={hasRegal}
          />
          <Calendar
            coursecomps={scheduled}
            selectEvent={selectEvent}
            sections={sections}
            components={components}
            customEvents={customEvents}
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
              customEvents={customEvents}
            />
          ))}
        </CardText>
      </Card>

      {selected && selectedType === 'coursecomp' && ( // Dialog that appears on event select
        <Dialog
          title={`${selected.subject} ${selected.course} ${selected.name} -- Section ${selected.section}`}
          actions={actions}
          open={eventOpen}
          onRequestClose={() => closeDialog()}
          autoScrollBodyContent
        >
          <p style={style.dialogContent}>{selected.class_mtg_info[0].meet_t}</p>
          <p>{selected.class_mtg_info[0].meet_l}</p>
          <p>{selected.instructor.join(', ')}</p>
          {selected.topic && <p>{selected.topic}</p>}
          {courseDesc && <p>{courseDesc}</p>}
          <p>ID: {selected.id}</p>
          {component && (
            <div>
              <h4>{component.component}</h4>
              <p>{component.meeting_time}</p>
              <p>{component.room}</p>
            </div>
          )}
        </Dialog>
      )}
      {selected && selectedType === 'customEvent' && ( // Dialog that appears on custom event select
        <Dialog
          title={`${selected.eventName}`}
          actions={actions}
          open={eventOpen}
          onRequestClose={() => closeDialog()}
          autoScrollBodyContent
        >
          <p style={style.dialogContent}>This is a custom event you added.</p>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarWrapper;

CalendarWrapper.propTypes = {
  currentTerm: React.PropTypes.string,
  coursecomps: React.PropTypes.arrayOf(React.PropTypes.object),
  eventOpen: React.PropTypes.bool,
  remove: React.PropTypes.func,
  closeDialog: React.PropTypes.func,
  swapComponent: React.PropTypes.func,
  sections: React.PropTypes.instanceOf(List),
  components: React.PropTypes.instanceOf(List),
  customEvents: React.PropTypes.instanceOf(List),
  currentCalendarName: React.PropTypes.string,
  setCalendarName: React.PropTypes.func,
  handleAuth: React.PropTypes.func,
  currentTermName: React.PropTypes.string,
  facebookPosted: React.PropTypes.func,
  regalSent: React.PropTypes.func,
  hasRegal: React.PropTypes.bool
};
