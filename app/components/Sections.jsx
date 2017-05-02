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
  disabledTitle: {
    marginTop: 0,
    opacity: 0.35
  },
  bodyText: {
    fontSize: 'small'
  },
  disabledBodyText: {
    fontSize: 'small',
    opacity: 0.35
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
            const descriptions = section.overview_of_class ? section.overview_of_class.split('<br/>') : ['No description available.'];
            const courseDesc = descriptions.map((desc, index) => <span key={index}>{desc}<br /></span>);
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
                    removeHover();
                  }
                }}
                onTouchTap={() => {
                  checkComponents(selected.subject, section.associated_classes);
                  addCourse(section);
                  removeHover();
                }}
              >
                <h4 style={inCal ? style.disabledTitle : style.title}>{`Section ${section.section}`}</h4>
                {section.topic && inCal ? <p style={{ opacity: 0.35 }}>{section.topic}</p> : <p>{section.topic}</p>}
                <p style={inCal ? style.disabledBodyText : style.bodyText}>{section.class_mtg_info[0].meet_t}</p>
                <p style={inCal ? style.disabledBodyText : style.bodyText}>{section.class_mtg_info[0].meet_l}</p>
                <p style={inCal ? style.disabledBodyText : style.bodyText}>{section.instructor.join(', ')}</p>
                {this.state.checkboxOpen && <p style={inCal ? style.disabledBodyText : style.bodyText}>{courseDesc}</p>}
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
