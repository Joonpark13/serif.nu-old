const initialCalendar = {
  sections: [],
  components: []
};

function calendar(state = initialCalendar, action) {
  let newState = {};
  switch (action.type) {
    case 'ADD_COURSE':
      newState = {
        sections: state.sections.concat(action.section)
      };
      break;
    case 'ADD_COURSE_SEARCH':
      newState = {
        sections: state.sections.concat(action.section)
      };
      break;
    case 'ADD_COMPONENT':
      newState = {
        components: state.components.concat(action.detail)
      };
      break;
    case 'ADD_COMPONENT_SEARCH':
      newState = {
        components: state.components.concat(action.detail)
      };
      break;
    case 'REMOVE': {
      const newSections = [];
      const newComponents = [];
      // Take out any matching ids to sectionId in both sections and components
      state.sections.forEach((section) => {
        if (section.id !== action.sectionId) newSections.push(section);
      });
      state.components.forEach((component) => {
        if (component.id !== action.sectionId) newComponents.push(component);
      });
      return {
        sections: newSections,
        components: newComponents
      };
    }
    default:
      return state;
  }
  return $.extend(true, {}, state, newState);
}

export default calendar;
