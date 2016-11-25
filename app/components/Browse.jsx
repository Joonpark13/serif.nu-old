import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Browse = ({ currentView, selected, schools, subjects, courses, showSubjects, showCourses, showSections }) => {
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
              onClick={() => showCourses(selected.school, subject.abbv)}
            />
          ))}
        </div>
      );
    case 'courses':
      return (
        <div>
          {courses.map((course) => (
            <RaisedButton
              key={course.abbv}
              label={course.name}
              onClick={() => showSections(selected.school, selected.subject, course.abbv)}
            />
          ))}
        </div>
      );
    default:
      return <div></div>;
  }
};

export default Browse;
