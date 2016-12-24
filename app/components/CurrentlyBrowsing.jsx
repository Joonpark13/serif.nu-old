import React from 'react';
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

const CurrentlyBrowsing = () => (
  <div style={style.box} >
    <div style={style.currentTermText}>Currently Browsing:</div>
    Winter 2017
  </div>
);

export default CurrentlyBrowsing;
