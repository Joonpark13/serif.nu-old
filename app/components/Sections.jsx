import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

import { inCalendar, getCourseName } from '../helpers';

const style = {
  sections: {
    marginBottom: '5px'
  },
  headings: {
    marginTop: 0,
    marginBottom: '5px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  loading: {
    display: 'block',
    margin: 'auto'
  }
};

const Sections = ({
  selected,
  isFetching,
  courses,
  sections,
  calendar,
  showCourses,
  checkComponents,
  addCourse
}) => {
  if (!isFetching) { // Make sure data has loaded
    return (
      <div>
        <div style={style.header}>
          <h3 style={style.headings}>{getCourseName(courses, selected.course)}</h3>
          <FlatButton
            label="Cancel"
            secondary
            onTouchTap={() => showCourses(selected.school, selected.subject)}
          />
        </div>
        <Divider style={style.divider} />
        <h3 style={style.headings}>Choose a course:</h3>

        {sections.map((section) => (
          <Card key={section.section} style={style.sections}>
            <CardTitle title={`Section ${section.section}`} subtitle={section.meeting_time} />
            <CardActions>
              <FlatButton
                label="Add Section"
                primary
                disabled={inCalendar(calendar.sections, section.id)}
                onClick={() => {
                  checkComponents(selected.school, selected.subject, selected.course, section.id);
                  addCourse(section);
                }}
              />
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
  // In case data did not load
  return <CircularProgress style={style.loading} />;
};

Sections.propTypes = {
  selected: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  calendar: React.PropTypes.object,
  courses: React.PropTypes.arrayOf(React.PropTypes.object),
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  showCourses: React.PropTypes.func.isRequired,
  checkComponents: React.PropTypes.func.isRequired,
  addCourse: React.PropTypes.func.isRequired
};

export default Sections;
