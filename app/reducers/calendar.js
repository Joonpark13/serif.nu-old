import { Map, fromJS } from 'immutable';

import { initialCalendar } from './helpers'; // Reducer related helper file
import { findCalObj, findData } from '../helpers'; // General helper functions

const populateNew = (classes, currentTerm, currentCalendar, classData) => (
  // Populate new sections array
  // Implicit return
  classes.map(term => {
    if (term.get('id') === currentTerm) {
      // Populate new data array
      const newItems = term.get('items').map(cal => {
        if (cal.get('id') === currentCalendar) return cal.set('data', fromJS(classData));
        return cal;
      });
      return term.set('items', newItems);
    }
    return term;
  })
);

const filterClasses = (classes, classId, currentTerm, currentCalendar) => {
  const newClassData = [];
  const calData = findData(classes, currentTerm, currentCalendar);
  calData.forEach((coursecomp) => {
    if (coursecomp.get('id') !== classId) newClassData.push(coursecomp);
  });
  const newClasses = populateNew(classes, currentTerm, currentCalendar, newClassData);
  return newClasses;
};

function calendar(state = initialCalendar, action, currentTerm) {
  switch (action.type) {
    case 'ADD_COURSE':
    case 'ADD_COURSE_SEARCH': {
      // Find corresponding calendar object data
      const sectionData = findData(
        state.get('sections'),
        currentTerm,
        state.get('currentCalendar')
      );
      const newSections = populateNew(
        state.get('sections'),
        currentTerm,
        state.get('currentCalendar'),
        sectionData.push(fromJS(action.section)) // Do the actual adding
      );
      return state.set('sections', newSections);
    }
    case 'ADD_COMPONENT':
    case 'ADD_COMPONENT_SEARCH':
    case 'ADD_COMPONENT_CART': {
      // Find corresponding calendar object data
      const componentData = findData(
        state.get('components'),
        currentTerm,
        state.get('currentCalendar')
      );
      const newComponents = populateNew(
        state.get('components'),
        currentTerm,
        state.get('currentCalendar'),
        componentData.push(fromJS(action.detail)) // Do the actual adding
      );
      return state.set('components', newComponents);
    }
    case 'REMOVE': {
      // Take out any matching ids to sectionId in sections
      const newSections = filterClasses(
        state.get('sections'),
        action.sectionId,
        currentTerm,
        state.get('currentCalendar')
      );
      // Take out any matching ids to sectionId in components
      const newComponents = filterClasses(
        state.get('components'),
        action.sectionId,
        currentTerm,
        state.get('currentCalendar')
      );
      return state.set('sections', newSections).set('components', newComponents);
    }
    case 'SWAP_COMPONENT': {
      // Remove currently selection component
      const newComponents = filterClasses(
        state.get('components'),
        action.sectionId,
        currentTerm,
        state.get('currentCalendar')
      );
      return state.set('components', newComponents);
    }
    case 'SELECT_EVENT':
      return state.set('eventOpen', true).set('selectedEvents', fromJS(action.coursecomps));
    case 'CLOSE_EVENT_DIALOG':
      return state.set('eventOpen', false);
    case 'ADD_COURSE_HOVER':
      return state.set('hover', Map({
        section: fromJS(action.section),
        component: null
      }));
    case 'ADD_COMPONENT_HOVER':
      return state.set('hover', Map({
        section: null,
        component: fromJS(action.detail)
      }));
    case 'REMOVE_HOVER':
      return state.set('hover', Map({
        section: null,
        component: null
      }));
    case 'FIRST_CALENDAR': {
      // Do nothing if already populated
      let populated = false;
      state.get('sections').map(term => {
        if (term.get('id') === currentTerm) populated = true;
      });
      if (populated) return state;
      // Otherwise initialize a new calendar for the new term
      return state
        .set('sections', state.get('sections').push(fromJS({
          id: currentTerm,
          items: [{
            id: 1,
            name: 'Calendar 1',
            data: []
          }]
        })))
      .set('components', state.get('components').push(fromJS({
        id: currentTerm,
        items: [{
          id: 1,
          name: 'Calendar 1',
          data: []
        }]
      })));
    }
    default:
      return state;
  }
}

export default calendar;
