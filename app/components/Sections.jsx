import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

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
  },
  bodyText: {
    fontSize: 'small'
  },
  checkbox: {
    paddingLeft: '5px'
  }
};

export default class Sections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxOpen: false
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  handleCheckbox() {
    this.setState({
      checkboxOpen: !this.state.checkboxOpen
    });
  }
  render() {
    const {
      currentTerm,
      currentCalendar,
      selected,
      sections,
      calendar,
      checkComponents,
      addCourse,
      addCourseHover,
      removeHover
    } = this.props;
    return (
      <div>
        <h3 style={style.headings}>Choose a section:</h3>
        <Checkbox
          checked={this.state.checkboxOpen}
          label="Show descriptions"
          onCheck={() => this.handleCheckbox()}
          style={style.checkbox}
        />

        <List>
          {sections.map(section => {
            const inCal = inCalendar(calendar.get('sections'), section.id, currentTerm, currentCalendar);
            const courseDesc = section.overview_of_class ? section.overview_of_class : 'No description available.';
            return (
              <ListItem
                key={section.section}
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
              >
                <h4 style={style.title}>{`Section ${section.section}`}</h4>
                {section.topic && <p>{section.topic}</p>}
                <p style={style.bodyText}>{section.meeting_time}</p>
                <p style={style.bodyText}>{section.location}</p>
                <p style={style.bodyText}>{section.instructor.join(', ')}</p>
                {this.state.checkboxOpen && <p style={style.bodyText}>{courseDesc}</p>}
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

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
  removeHover: React.PropTypes.func,
  currentCalendar: React.PropTypes.number
};
