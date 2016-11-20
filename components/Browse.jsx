import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Browse = (props) => (
  <div>
    {props.schools.map((school) => (
      <RaisedButton key={school.id} label={school.name} />
    ))}
  </div>
);

export default Browse;