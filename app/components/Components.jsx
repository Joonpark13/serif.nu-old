import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';

import { getCourseName } from '../helpers';

const style = {
  components: {
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

const Components = ({
  isFetching,
  sections,
  selected,
  courses,
  details,
  addComponent
}) => {
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
          <h3 style={style.headings}>{getCourseName(courses, selected.course)}</h3>
          {/* TODO: remove corresponding section if cancel is clicked
          <FlatButton
          label="Cancel"
          secondary
          onTouchTap={() => showCourses(selected.school, selected.subject)}
          />
          */}
        </div>
        <Divider style={style.divider} />
        <h3 style={style.headings}>Choose a component:</h3>

        {details.associated_classes.map((comp, index) => (
          <Card key={index} style={style.components}>
            <CardTitle title={comp.component} subtitle={comp.meeting_time} />
            <CardActions>
              <FlatButton
                label="Add Component"
                primary
                onClick={() => addComponent({
                  id: selected.section,
                  title: `${sectionTitle} ${comp.component}`,
                  ...comp
                })}
              />
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
  // When not loaded:
  return <CircularProgress style={style.loading} />;
};

Components.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  sections: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selected: React.PropTypes.shape({
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }).isRequired,
  courses: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  details: React.PropTypes.shape({
    _id: React.PropTypes.string,
    qtr: React.PropTypes.string,
    lmod: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    topic: React.PropTypes.string,
    class_mtg_info: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    enrl_requirement: React.PropTypes.string,
    class_attributes: React.PropTypes.string,
    associated_classes: React.PropTypes.array,
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }),
  addComponent: React.PropTypes.func
};

export default Components;
