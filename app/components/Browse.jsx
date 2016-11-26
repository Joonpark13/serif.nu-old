import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Sections from './Sections.jsx';

const Browse = (
  {
    currentView,
    selected,
    schools,
    subjects,
    courses,
    sections,
    details,
    showSubjects,
    showCourses,
    showSections,
    checkComponents,
    addCourse,
    addComponent,
    closeSections
  }
) => {
  const courseView = courses.map((course) => (
      <RaisedButton
        key={course.abbv}
        label={course.name}
        onClick={() => showSections(selected.school, selected.subject, course.abbv)}
      />
  ));
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
      return <div>{courseView}</div>;
    case 'sections':
      let selectedCourseName = '';
      courses.forEach((course) => {
        if (course.abbv == selected.course) {
          selectedCourseName = course.name;
        }
      });
      return (
        <div>
          {courseView}
          <Sections
            isOpen={currentView === 'sections'}
            selected={selected}
            sections={sections}
            details={details}
            courseName={selectedCourseName}
            checkComponents={checkComponents}
            addCourse={addCourse}
            addComponent={addComponent}
            close={closeSections}
          />
        </div>
      );
    default:
      return <div></div>;
  }
};

export default Browse;
