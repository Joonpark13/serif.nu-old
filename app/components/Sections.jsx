import React from 'react';
import { List, ListItem } from 'material-ui/List';

import { inCalendar } from '../helpers';

const style = {
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
  },
  title: {
    marginTop: 0
  }
};

const Sections = ({
  currentTerm,
  currentCalendar,
  selected,
  sections,
  calendar,
  checkComponents,
  addCourse,
  addCourseHover,
  removeHover
}) => (
  <div>
    <h3 style={style.headings}>Choose a section:</h3>

    <List>
      {sections.map(section => {
        const inCal = inCalendar(calendar.get('sections'), section.id, currentTerm, currentCalendar);
        return (
          <ListItem
            key={section.section}
            primaryText={<h4 style={style.title}>{`Section ${section.section}`}</h4>}
            secondaryText={
              <div>
                <p>
                  {section.meeting_time}
                  <br />
                  {section.instructor.join(', ')}
                </p>
              </div>
            }
            secondaryTextLines={2}
            // Make sure the section is not already in calendar
            disabled={inCal}
            onMouseEnter={() => {
              if (!inCal) {
                addCourseHover(section);
              }
            }}
            onMouseLeave={() => {
              if (!inCal) {
                removeHover(section.id);
              }
            }}
            onTouchTap={() => {
              checkComponents(currentTerm, selected.school, selected.subject, selected.course, section.id);
              addCourse(section);
              removeHover(section.id);
            }}
          />
         );
      })}
    </List>
  </div>
);

Sections.propTypes = {
  currentTerm: React.PropTypes.string,
  selected: React.PropTypes.shape({
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }).isRequired,
  calendar: React.PropTypes.shape({
    sections: React.PropTypes.array,
    components: React.PropTypes.array
  }),
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  checkComponents: React.PropTypes.func.isRequired,
  addCourse: React.PropTypes.func.isRequired,
  addCourseHover: React.PropTypes.func,
  removeHover: React.PropTypes.func
};

export default Sections;
