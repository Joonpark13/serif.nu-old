import $ from 'jquery';

import { initialCalendar } from './helpers';

const findTermObj = (coursecomps, currentTerm) => {
  let foundTermObj = null;
  coursecomps.forEach((term) => {
    if (term.id === currentTerm) foundTermObj = term;
  });
  return foundTermObj;
};

const filterComponents = (components, sectionId, currentTerm) => {
  const newComponentItems = [];
  const termObj = findTermObj(components, currentTerm);
  termObj.items.forEach((section) => {
    if (section.id !== sectionId) newComponentItems.push(section);
  });
  const newTerm = {
    id: currentTerm,
    items: newComponentItems
  };
  // Populate new components array
  const newComponents = [];
  components.forEach((term) => {
    if (term.id === currentTerm) newComponents.push(newTerm);
    else newComponents.push(term);
  });
  return newComponents;
};

function calendar(state = initialCalendar, action, currentTerm) {
  let newState = {};
  switch (action.type) {
    case 'ADD_COURSE':
    case 'ADD_COURSE_SEARCH': {
      // Find corresponding term object
      const selectedTerm = findTermObj(state.sections, currentTerm);
      if (selectedTerm) {
        selectedTerm.items.push(action.section);
        const newSections = [];
        // Create new sections array
        state.sections.forEach((term) => {
          if (term.id === currentTerm) newSections.push(selectedTerm);
          else newSections.push(term);
        });
        return {
          sections: newSections,
          components: state.components,
          hover: state.hover,
          eventOpen: state.eventOpen,
          selectedEvents: state.selectedEvents
        };
      } // If no term object is found
      return {
        sections: state.sections.concat({
          id: currentTerm,
          items: [action.section]
        }),
        components: state.components,
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'ADD_COMPONENT':
    case 'ADD_COMPONENT_SEARCH':
    case 'ADD_COMPONENT_CART': {
      // Find corresponding term object
      const selectedTerm = findTermObj(state.components, currentTerm);
      if (selectedTerm) {
        selectedTerm.items.push(action.detail);
        const newComponents = [];
        // Create new components array
        state.components.forEach((term) => {
          if (term.id === currentTerm) newComponents.push(selectedTerm);
          else newComponents.push(term);
        });
        return {
          sections: state.sections,
          components: newComponents,
          hover: state.hover,
          eventOpen: state.eventOpen,
          selectedEvents: state.selectedEvents
        };
      } // If no term object is found
      return {
        sections: state.sections,
        components: state.components.concat({
          id: currentTerm,
          items: [action.detail]
        }),
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'REMOVE': {
      // Take out any matching ids to sectionId in both sections and components
      const newSectionItems = [];
      const termObj = findTermObj(state.sections, currentTerm);
      termObj.items.forEach((section) => {
        if (section.id !== action.sectionId) newSectionItems.push(section);
      });
      const newTerm = {
        id: currentTerm,
        items: newSectionItems
      };
      // Populate new sections array
      const newSections = [];
      state.sections.forEach((term) => {
        if (term.id === currentTerm) newSections.push(newTerm);
        else newSections.push(term);
      });
      const newComponents = filterComponents(state.components, action.sectionId, currentTerm);
      return {
        sections: newSections,
        components: newComponents,
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'SWAP_COMPONENT': {
      // Remove currently selection component
      const newComponents = filterComponents(state.components, action.sectionId, currentTerm);
      return {
        sections: state.sections,
        components: newComponents,
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'SELECT_EVENT':
      return {
        sections: state.sections,
        components: state.components,
        hover: state.hover,
        eventOpen: true,
        selectedEvents: action.coursecomps
      };
    case 'CLOSE_EVENT_DIALOG':
      return {
        sections: state.sections,
        components: state.components,
        hover: state.hover,
        eventOpen: false,
        selectedEvents: state.selectedEvents
      };
    case 'ADD_COURSE_HOVER':
      newState = {
        hover: {
          section: action.section,
          component: null
        }
      };
      break;
    case 'ADD_COMPONENT_HOVER':
      newState = {
        hover: {
          section: null,
          component: action.detail
        }
      };
      break;
    case 'REMOVE_HOVER':
      return {
        sections: state.sections,
        components: state.components,
        hover: {
          section: null,
          component: null
        },
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    default:
      return state;
  }
  return $.extend(true, {}, state, newState);
}

export default calendar;
