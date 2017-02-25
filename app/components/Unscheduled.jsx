import React from 'react';
import Paper from 'material-ui/Paper';

import { findSelected } from '../helpers';

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
    marginRight: '10px',
    overflow: 'hidden'
  }
};

const Unscheduled = ({ id, title, color, sections, components, selectEvent, customEvents }) => {
  // Find the corresponding event from the state arrays
  const selected = findSelected(sections, components, customEvents, id);
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
