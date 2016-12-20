const initialCalendar = {
  sections: [],
  components: []
};

const filterComponents = (components, sectionId) => {
  const newComponents = [];
  components.forEach((component) => {
    if (component.id !== sectionId) newComponents.push(component);
  });
  return newComponents;
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
    case 'ADD_COMPONENT_SEARCH':
    case 'ADD_COMPONENT_CART':
      newState = {
        components: state.components.concat(action.detail)
      };
      break;
    case 'REMOVE': {
      // Take out any matching ids to sectionId in both sections and components
      const newSections = [];
      state.sections.forEach((section) => {
        if (section.id !== action.sectionId) newSections.push(section);
      });
      const newComponents = filterComponents(state.components, action.sectionId);
      return {
        sections: newSections,
        components: newComponents
      };
    }
    case 'SWAP_COMPONENT': {
      // Remove currently selection component
      const newComponents = filterComponents(state.components, action.sectionId);
      return {
        sections: state.sections,
        components: newComponents
      };
    }
    default:
      return state;
  }
  return $.extend(true, {}, state, newState);
}

export default calendar;
