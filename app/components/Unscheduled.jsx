import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: '40px',
    width: '200px',
    display: 'inline-block',
    color: 'white',
    cursor: 'pointer',
    paddingLeft: '5px',
    paddingRight: '5px',
    fontWeight: 'bold',
    marginRight: '10px'
  }
};

const Unscheduled = ({ id, title, color, sections, components, selectEvent }) => {
  const selected = {};
  // Find the corresponding event from the state arrays
  sections.forEach((section) => {
    if (section.id === id) selected.section = section;
  });
  components.forEach((component) => {
    if (component.id === id) selected.component = component;
  });
  return (
    <Paper
      style={{ backgroundColor: color, ...style.paper }}
      zDepth={0}
      onTouchTap={() => selectEvent(selected)}
    >
      {title}
    </Paper>
  );
};

Unscheduled.propTypes = {
  title: React.PropTypes.string
};

export default Unscheduled;
