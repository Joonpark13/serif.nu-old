import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

import Sections from './Sections.jsx';
import Components from './Components.jsx';

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
    alignItems: 'center',
    flexWrap: 'wrap'
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
    currentTerm,
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
    addComponent,
    addCourseHover,
    addComponentHover,
    removeHover
  }
) => {
  const homeChip = <Chip onTouchTap={() => showSchools()}>All</Chip>;
  const arrow = <FontIcon className="material-icons">chevron_right</FontIcon>;
  const schoolNav = <Chip onTouchTap={() => showSubjects(currentTerm, selected.school)}>{selected.school}</Chip>;
  const subjectNav = (
    <Chip onTouchTap={() => showCourses(currentTerm, selected.school, selected.subject)}>
      {selected.subject}
    </Chip>
  );
  const divider = <Divider style={style.divider} />;
  let nav;
  switch (currentView) {
    case 'subjects':
      nav = (
        <div>
          <div style={style.nav}>
            {homeChip}
            {arrow}
            <h4>{selected.school}</h4>
          </div>

          {divider}
        </div>
      );
      break;
    case 'courses':
      nav = (
        <div>
          <div style={style.nav}>
            {homeChip}
            {arrow}
            {schoolNav}
            {arrow}
            <h4>{selected.subject}</h4>
          </div>

          {divider}
        </div>
      );
      break;
    case 'sections':
      nav = (
        <div>
          <div style={style.nav}>
            {homeChip}
            {arrow}
            {schoolNav}
            {arrow}
            {subjectNav}
            {arrow}
            <h4>{selected.course}</h4>
          </div>

          {divider}
        </div>
      );
      break;
    default:
      nav = null;
  }

  switch (currentView) {
    case 'schools':
      if (!isFetching) { // Make sure data has loaded
        return (
          <div>
            {schools.map((school) => (
              <RaisedButton
                key={school.id}
                label={school.id}
                onClick={() => showSubjects(currentTerm, school.id)}
                primary
                style={style.schools}
              />
            ))}
          </div>
        );
      } // In case data did not load
      return <CircularProgress style={style.loading} />;

    case 'subjects':
      if (!isFetching) { // Make sure data has loaded
        return (
          <div>
            {nav}
            {subjects.map((subject) => (
              <RaisedButton
                key={subject.abbv}
                label={subject.name}
                onClick={() => showCourses(currentTerm, selected.school, subject.abbv)}
                fullWidth
                primary
                style={style.subjects}
              />
            ))}
          </div>
        );
      } // In case data did not load
      return <CircularProgress style={style.loading}/>;

    case 'courses':
      if (!isFetching) { // Make sure data has loaded
        if (courses.length > 0) {
          return (
            <div>
              {nav}
              {courses.map((course) => (
                <RaisedButton
                  key={course.abbv}
                  label={`${course.abbv} ${course.name}`}
                  onClick={() => showSections(currentTerm, selected.school, selected.subject, course.abbv)}
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
                <Chip onTouchTap={() => showSubjects(currentTerm, selected.school)}>{selected.school}</Chip>
                {arrow}
                <h4>{selected.subject}</h4>
              </div>

              <Divider style={style.divider} />

              <h4>No Courses</h4>
            </div>
          );
        }
      } // In case data did not load
      return <CircularProgress style={style.loading} />;

    case 'sections':
      if (!isFetching) { // Make sure data has loaded
        return (
          <div>
            {nav}
            <Sections
              currentTerm={currentTerm}
              selected={selected}
              courses={courses}
              sections={sections}
              calendar={calendar}
              checkComponents={checkComponents}
              addCourse={addCourse}
              addCourseHover={addCourseHover}
              removeHover={removeHover}
            />
          </div>
        );
      } // In case data did not load
      return <CircularProgress style={style.loading} />;

    case 'components':
      if (!isFetching) { // Make sure data has loaded
        // TODO: Add nav and make sure if user cancels, the corresponding
        // section is removed from calendar
        return (
          <Components
            sections={sections}
            selected={selected}
            details={details}
            addComponent={addComponent}
            addComponentHover={addComponentHover}
            removeHover={removeHover}
          />
        );
      } // In case data did not load
      return <CircularProgress style={style.loading} />;

    default:
      return <div></div>;
  }
};

Browse.propTypes = {
  currentView: React.PropTypes.string.isRequired,
  selected: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  schools: React.PropTypes.arrayOf(React.PropTypes.object),
  subjects: React.PropTypes.arrayOf(React.PropTypes.object),
  courses: React.PropTypes.arrayOf(React.PropTypes.object),
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  details: React.PropTypes.object,
  showSchools: React.PropTypes.func.isRequired,
  showSubjects: React.PropTypes.func.isRequired,
  showCourses: React.PropTypes.func.isRequired,
  showSections: React.PropTypes.func.isRequired,
  checkComponents: React.PropTypes.func.isRequired,
  addCourse: React.PropTypes.func.isRequired,
  addComponent: React.PropTypes.func.isRequired,
  calendar: React.PropTypes.shape({
    sections: React.PropTypes.array,
    components: React.PropTypes.array
  }),
  addCourseHover: React.PropTypes.func,
  removeHover: React.PropTypes.func
};

export default Browse;
