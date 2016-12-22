export const inCalendar = (sections, id) => (
  sections.some(section => section.id === id)
);

export const getCourseName = (courses, abbv) => (
  courses.find(course => course.abbv === abbv).name
);

export const matchId = (id) => (
  (component) => (id === component.id)
);
