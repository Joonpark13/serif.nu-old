import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Browse = (props) => (
  <div>
    {props.data.map((datum) => (
      <RaisedButton key={datum.id} label={datum.name} />
    ))}
  </div>
);

export default Browse;