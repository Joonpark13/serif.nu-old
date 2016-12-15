import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { inCalendar } from '../helpers';

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
  sections,
  calendar,
  checkComponents,
  addCourse
}) => (
    <div>
      <h3 style={style.headings}>Choose a section:</h3>

      {sections.map(section => (
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

Sections.propTypes = {
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
  addCourse: React.PropTypes.func.isRequired
};

export default Sections;
