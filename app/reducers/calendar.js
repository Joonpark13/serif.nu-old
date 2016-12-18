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
    default:
      return state;
  }
  return $.extend(true, {}, state, newState);
}

export default calendar;
