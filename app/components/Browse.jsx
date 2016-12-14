import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

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
    marginBottom: 0
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5px'
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

const inCalendar = (sections, id) => {
  return sections.some(section => section.id === id);
};

const added = (section) => {
  return section.id
}

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
      if (!isFetching) { // Make sure data has loaded
        return (
          <div>
            <div style={style.header}>
              <h3 style={style.headings}>Choose a section:</h3>
              <FlatButton
                label="Cancel"
                secondary
                onTouchTap={() => showCourses(selected.school, selected.subject)}
              />
            </div>

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
      } else { // In case data did not load
        return <CircularProgress style={style.loading} />;
      }

    case 'components':
      if (!isFetching) { // Make sure data has loaded
        let sectionTitle = '';
        sections.forEach((section) => {
          if (section.id === selected.section) {
            sectionTitle = section.name;
          }
        });
        return (
          <div>
            <div style={style.header}>
              <h3 style={style.headings}>Choose a component:</h3>
            </div>

            {details.associated_classes.map((comp, index) => (
              <Card key={index}  style={style.components}>
                <CardTitle title={comp.component} subtitle={comp.meeting_time} />
                <CardActions>
                  <FlatButton
                    label="Add Component"
                    primary
                    onClick={() => addComponent({
                      id: selected.section,
                      title: sectionTitle + ' ' + comp.component,
                      ...comp
                    })}
                  />
                </CardActions>
              </Card>
            ))}
          </div>
        );
      } else {
        return <CircularProgress style={style.loading} />;
      }

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
