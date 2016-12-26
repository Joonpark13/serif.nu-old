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
  let foundCalObj = null;
  classes.forEach((term) => {
    if (term.id === currentTerm) { // Find the corresponding term object
      term.items.forEach((cal) => {
        // Find the corresponding calendar object
        if (cal.id === currentCalendar) foundCalObj = cal;
      });
    }
  });
  return foundCalObj;
};

export const findData = (classes, currentTerm, currentCalendar) => {
  const calObj = findCalObj(classes, currentTerm, currentCalendar);
  if (calObj) return calObj.data;
  return [];
};
