import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Browse = ({ currentView, schools, subjects, showSubjects, showCourses }) => {
  switch (currentView) {
    case 'schools':
      return (
        <div>
          {schools.map((school) => (
            <RaisedButton
              key={school.id}
              label={school.name}
              onClick={() => showSubjects(school.id)}
            />
          ))}
        </div>
      );
    case 'subjects':
      return (
        <div>
          {subjects.map((subject) => (
            <RaisedButton
              key={subject.abbv}
              label={subject.name}
              onClick={() => showCourses(subject.abbv)}
            />
          ))}
        </div>
      );
    default:
      return <div></div>;
  }
};

export default Browse;
