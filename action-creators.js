export function showSubjects(schoolId) {
  return {
    type: 'SHOW_SUBJECTS',
    schoolId
  };
}

export function showCourses(subjectId) {
  return {
    type: 'SHOW_COURSES',
    subjectId
  };
}
