import { List } from 'immutable';

export const inCalendar = (sections, id) => (
  sections.some(section => section.id === id)
);

export const getCourseName = (courses, abbv) => (
  courses.find(course => course.abbv === abbv).name
);

export const matchId = (id) => (
  (component) => (id === component.id)
);

export const findCalObj = (classes, currentTerm, currentCalendar) => {
  // Find the corresponding term object
  const matchTerm = classes.find(term => term.get('id') === currentTerm);
  // Find the corresponding calendar object
  if (matchTerm) {
    return matchTerm.get('items').find(cal => cal.get('id') === currentCalendar);
  }
  return matchTerm; // undefined
};

export const findData = (classes, currentTerm, currentCalendar) => {
  const calObj = findCalObj(classes, currentTerm, currentCalendar);
  if (calObj) return calObj.get('data');
  return List([]);
};
