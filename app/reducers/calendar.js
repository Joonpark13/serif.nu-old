import { Map, fromJS } from 'immutable';

import { initialCalendar } from './helpers'; // Reducer related helper file
import { findData } from '../helpers'; // General helper functions

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

const filterCustomEvents = (customEvents, id, currentTerm, currentCalendar) => {
  return customEvents.filter(customEvent => customEvent.get('id') !== id);
}

// http://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
const guidGenerator = () => {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+"-"+S4());
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
      const currentCalendar = state.get('currentCalendar');
      // Take out any matching ids to sectionId in sections
      const newSections = filterClasses(
        state.get('sections'),
        action.sectionId,
        currentTerm,
        currentCalendar
      );
      // Take out any matching ids to sectionId in components
      const newComponents = filterClasses(
        state.get('components'),
        action.sectionId,
        currentTerm,
        currentCalendar
      );
      // Take out matching id in custom events
      const newCustomEvents = filterCustomEvents(
        state.get('customEvents'),
        action.sectionId,
        currentTerm,
        currentCalendar
      )
      return state
        .set('sections', newSections)
        .set('components', newComponents)
        .set('customEvents', newCustomEvents);
    }
    case 'SWAP_COMPONENT': {
      // Remove currently selected component
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
      return state.set('eventOpen', false).set('selectedEvents', state.get('selectedEvents').clear());
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
      state.get('sections').forEach(term => {
        if (term.get('id') === currentTerm) populated = true;
      });
      if (populated) return state;
      // Otherwise initialize a new calendar for the new term
      return state
        .set('sections', state.get('sections').push(fromJS({
          id: currentTerm,
          items: [{
            id: 1,
            name: 'My Schedule',
            data: []
          }]
        })))
      .set('components', state.get('components').push(fromJS({
        id: currentTerm,
        items: [{
          id: 1,
          name: 'My Schedule',
          data: []
        }]
      })));
    }
    case 'ADD_CALENDAR': {
      const sections = state.get('sections');
      const currentTermCalendars = sections
        .find(term => term.get('id') === currentTerm)
        .get('items'); // currentTermCalendars is a list of calendar objects from the current term

      const newId = currentTermCalendars.last().get('id') + 1;
      // If a schedule with the name "New Schedule" exists, hasNewSchedule will be set to true
      const hasNewSchedule = currentTermCalendars.findIndex(
        cal => cal.get('name') === 'New Schedule'
      ) !== -1;

      // If a schedule with the name "New Schedule" exists",
      // find the schedules with names in the format of "New Schedule (x)"
      // where x is an integer, and assign the largest x to calNumber
      let calNumber = 0;
      if (hasNewSchedule) {
        currentTermCalendars.forEach(cal => {
          const calName = cal.get('name');
          if (calName.match(/^New Schedule \([0-9]+\)$/)) {
            calNumber = parseInt(calName.substring(14, calName.length - 1), 10);
            // Second parameter to parseInt is to indicate base 10
          }
        });
      }

      const newCal = fromJS({
        id: newId,
        name: hasNewSchedule ? `New Schedule (${calNumber + 1})` : 'New Schedule',
        data: []
      });
      const newSections = sections.update(
        sections.findIndex(term => term.get('id') === currentTerm),
        term => term.set('items', term.get('items').push(newCal))
      );

      const components = state.get('components');
      const newComponents = components.update(
        components.findIndex(term => term.get('id)') === currentTerm),
        term => term.set('items', term.get('items').push(newCal))
      );

      return state
        .set('sections', newSections)
        .set('components', newComponents)
        .set('currentCalendar', newId);
    }
    case 'CHANGE_CALENDAR':
      return state.set('currentCalendar', action.calId);
    case 'CHANGE_TERM': {
      const termObj = state.get('sections').find(term => term.get('id') === action.termId);
      if (termObj) {
        return state.set(
          'currentCalendar',
          state
            .get('sections')
            .find(term => term.get('id') === action.termId)
            .get('items')
            .first()
            .get('id')
        );
      }
      return state.set('currentCalendar', 1);
    }
    case 'SET_CALENDAR_NAME':
      return state
        .set('sections', state.get('sections').update(
          state.get('sections').findIndex(term => term.get('id') === currentTerm),
          term => term.set('items', term.get('items').update(
            term.get('items').findIndex(cal => cal.get('id') === state.get('currentCalendar')),
            cal => cal.set('name', action.name)
          ))
        ))
        .set('components', state.get('components').update(
          state.get('components').findIndex(term => term.get('id') === currentTerm),
          term => term.set('items', term.get('items').update(
            term.get('items').findIndex(cal => cal.get('id') === state.get('currentCalendar')),
            cal => cal.set('name', action.name)
          ))
        ));
    case 'REMOVE_CALENDAR': {
      const deletedIndex = state
        .get('sections')
        .find(term => term.get('id') === currentTerm)
        .get('items')
        .findIndex(cal => cal.get('id') === state.get('currentCalendar'));
      const deleted = state
        .set('sections', state.get('sections').update(
          state.get('sections').findIndex(term => term.get('id') === currentTerm),
          term => term.set('items', term.get('items').delete(deletedIndex))
        ))
        .set('components', state.get('components').update(
          state.get('components').findIndex(term => term.get('id') === currentTerm),
          term => term.set('items', term.get('items').delete(deletedIndex))
        ));
      return deleted
        .set(
          'currentCalendar',
          deleted
            .get('sections')
            .find(term => term.get('id') === currentTerm)
            .get('items')
            .first()
            .get('id')
        );
    }
    case 'REMOVE_ALL': {
      const sections = state.get('sections');
      const components = state.get('components');
      return state
        .set(
          'sections',
          sections.update(
            sections.findIndex(term => term.get('id') === currentTerm),
            term => term.set('items', term.get('items').update(
              term.get('items').findIndex(cal => cal.get('id') === state.get('currentCalendar')),
              cal => cal.set('data', cal.get('data').clear())
            ))
          )
        )
        .set(
          'components',
          components.update(
            components.findIndex(term => term.get('id') === currentTerm),
            term => term.set('items', term.get('items').update(
              term.get('items').findIndex(cal => cal.get('id') === state.get('currentCalendar')),
              cal => cal.set('data', cal.get('data').clear())
            ))
          )
        );
    }
    case 'ADD_EVENT': {
      let id = guidGenerator();
      let isUnique = true;
      // Go through list of events and make sure generated key is unique
      // if not, repeat generating ids until it is
      do {
        state.get('customEvents').forEach(customEvent => {
          if (customEvent.get('id') === id) {
            isUnique = false;
          }
        })
      } while (!isUnique);
      return state.set(
        'customEvents',
        state.get('customEvents').push(fromJS({
          id,
          calendarId: state.get('currentCalendar'),
          termId: currentTerm,
          ...action.customEvent
        }))
      );
    }
    default:
      return state;
  }
}

export default calendar;
