import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

const style = {
  box: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8
  },
  currentTermText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: '10px'
  }
};

const TermSelect = () => (
  <div style={style.box} >
    <div style={style.currentTermText}>Term:</div>
    <Chip>
      <Avatar icon={<FontIcon className="material-icons">expand_more</FontIcon>} />
      Winter 2017
    </Chip>
  </div>
);

export default TermSelect;
