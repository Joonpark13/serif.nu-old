import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

import Sections from './Sections.jsx';
import Components from './Components.jsx';
import { getCourseName } from '../helpers';

const style = {
  schools: {
    marginBottom: '3px',
    marginLeft: '3px',
    marginRight: '3px',
    width: '50px'
  },
  subjects: {
    marginBottom: '3px'
  },
  courses: {
    marginBottom: '3px'
  },
  sections: {
    marginBottom: '5px'
  },
  components: {
    marginBottom: '5px'
  },
  back: {
    display: 'inline-block'
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
  nav: {
    display: 'flex',
    alignItems: 'center'
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

const Browse = (
  {
    currentView,
    selected,
    isFetching,
    schools,
    subjects,
    courses,
    sections,
    details,
    calendar,
    showSchools,
    showSubjects,
    showCourses,
    showSections,
    checkComponents,
    addCourse,
    addComponent
  }
) => {
  const homeChip = <Chip onTouchTap={() => showSchools()}>All</Chip>;
  const arrow = <FontIcon className="material-icons">chevron_right</FontIcon>;

  switch (currentView) {
    case 'schools':
      if (!isFetching) { // Make sure data has loaded
        return (
          <div>
            {schools.map((school) => (
              <RaisedButton
                key={school.id}
                label={school.id}
                onClick={() => showSubjects(school.id)}
                primary
                style={style.schools}
              />
            ))}
          </div>
        );
      } else { // In case data did not load
        return <CircularProgress style={style.loading} />;
      }

    case 'subjects':
      if (!isFetching) { // Make sure data has loaded
        return (
          <div>
            <div style={style.nav}>
              {homeChip}
              {arrow}
              <h4>{selected.school}</h4>
            </div>

            <Divider style={style.divider} />
            
            {subjects.map((subject) => (
              <RaisedButton
                key={subject.abbv}
                label={subject.name}
                onClick={() => showCourses(selected.school, subject.abbv)}
                fullWidth
                primary
                style={style.subjects}
              />
            ))}
          </div>
        );
      } else { // In case data did not load
        return <CircularProgress style={style.loading}/>;
      }

    case 'courses':
      if (!isFetching) { // Make sure data has loaded
        if (courses.length > 0) {
          return (
            <div>
              <div style={style.nav}>
                {homeChip}
                {arrow}
                <Chip onTouchTap={() => showSubjects(selected.school)}>{selected.school}</Chip>
                {arrow}
                <h4>{selected.subject}</h4>
              </div>

              <Divider style={style.divider} />

              {courses.map((course) => (
                <RaisedButton
                  key={course.abbv}
                  label={`${course.abbv} ${course.name}`}
                  onClick={() => showSections(selected.school, selected.subject, course.abbv)}
                  primary
                  fullWidth
                  style={style.courses}
                />
              ))}
            </div>
          );
        } else {
          return (
            <div>
              <div style={style.nav}>
                {homeChip}
                {arrow}
                <Chip onTouchTap={() => showSubjects(selected.school)}>{selected.school}</Chip>
                {arrow}
                <h4>{selected.subject}</h4>
              </div>

              <Divider style={style.divider} />

              <h4>No Courses</h4>
            </div>
          );
        }
      } else { // In case data did not load
        return <CircularProgress style={style.loading} />;
      }

    case 'sections':
      return <Sections
        selected={selected}
        isFetching={isFetching}
        courses={courses}
        sections={sections}
        calendar={calendar}
        showCourses={showCourses}
        checkComponents={checkComponents}
        addCourse={addCourse}
      />;

    case 'components':
      return <Components
        isFetching={isFetching}
        sections={sections}
        selected={selected}
        courses={courses}
        details={details}
        addComponent={addComponent}
      />;

    default:
      return <div></div>;
  }
};

Browse.propTypes = {
  currentView: React.PropTypes.string.isRequired,
  selected: React.PropTypes.object.isRequired,
  schools: React.PropTypes.arrayOf(React.PropTypes.object),
  subjects: React.PropTypes.arrayOf(React.PropTypes.object),
  courses: React.PropTypes.arrayOf(React.PropTypes.object),
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  details: React.PropTypes.object,
  showSubjects: React.PropTypes.func.isRequired,
  showCourses: React.PropTypes.func.isRequired,
  showSections: React.PropTypes.func.isRequired,
  checkComponents: React.PropTypes.func.isRequired,
  addCourse: React.PropTypes.func.isRequired,
  addComponent: React.PropTypes.func.isRequired
};

export default Browse;
