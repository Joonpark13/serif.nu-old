const initialState = {
    currentView: 'schools',
    schools: [{id: 'AAAA', name: 'aaaa'}, {id: 'BBBB', name: 'bbbb'}],
    subjects: [{id: 'CCC', name: 'ccc'}, {id: 'DDD', name: 'ddd'}]
};

function browse(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SUBJECTS':
      return {
        ...state,
        currentView: 'subjects'
      };
    case 'SHOW_COURSES':
      return {
        ...state,
        currentView: 'courses'
      };
    default:
      return state;
  }
}

export default browse;
