import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';

import Calendar from './Calendar.jsx';

const style = {
  card: {
    margin: 10
  }
};

const CalendarWrapper = ({ coursecomps, showCart }) => {
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
  return (
    <div>
      <Card style={style.card}>
        <CardText>
          <Calendar coursecomps={scheduled} showCart={showCart} />
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
    </div>
  );
};

export default CalendarWrapper;

CalendarWrapper.propTypes = {
  coursecomps: React.PropTypes.arrayOf(React.PropTypes.object),
  showCart: React.PropTypes.func
};
