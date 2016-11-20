import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Browse = (props) => (
  <div>
    {props.schools.map((school) => (
      <RaisedButton key={school.id} label={school.name} onClick={props.showSubjects(school.id)} />
    ))}
  </div>
);

export default Browse;