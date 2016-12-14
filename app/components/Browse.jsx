import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

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
  headings: {
    marginTop: 0
  },
  nav: {
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    marginBottom: '10px'
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

    case 'subjects':
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

    case 'courses':
      return (
        <div>
          <div style={style.nav}>
            {homeChip}
            {arrow}
            <Chip onTouchTap={() => showSubjects(selected.school)} style={style.nav}>{selected.school}</Chip>
            {arrow}
            <h4>{selected.subject}</h4>
          </div>

          <Divider style={style.divider} />

          {courses.map((course) => (
            <RaisedButton
              key={course.abbv}
              label={course.name}
              onClick={() => showSections(selected.school, selected.subject, course.abbv)}
              fullWidth
              style={style.courses}
            />
          ))}
        </div>
      );

    case 'sections':
      return (
        <div>
          <h3 style={style.headings}>Choose a section:</h3>
          {sections.map((section) => (
            <Card key={section.section} style={style.sections}>
              <CardTitle title={`Section ${section.section}`} subtitle={section.meeting_time} />
              <CardActions>
                <FlatButton
                  label="Add Section"
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

    case 'components':
      let sectionTitle = '';
      sections.forEach((section) => {
        if (section.id === selected.section) {
          sectionTitle = section.name;
        }
      });
      return (
        <div>
          <h3 style={style.headings}>Choose a component:</h3>
          {details.associated_classes.map((comp, index) => (
            <Card key={index}  style={style.components}>
              <CardTitle title={comp.component} subtitle={comp.meeting_time} />
              <CardActions>
                <FlatButton
                  label="Add Component"
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
