const initialState = {
    currentView: 'schools',
    selectedSchool: '',
    selectedSubject: '',
    data: {
      schools: {
        isFetching: false,
        lastUpdated: 0,
        items: [{id: 'AAAA', name: 'aaaa'}, {id: 'BBBB', name: 'bbbb'}]
      },
      subjects: {
        isFetching: false,
        lastUpdated: 0,
        items: [{id: 'CCC', name: 'ccc'}, {id: 'DDD', name: 'ddd'}]
      }
    }
};

function schools(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_SCHOOLS':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_SCHOOLS':
      return {
        ...state,
        isFetching: false,
        items: action.schools,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function subjects(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_SUBJECTS':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_SUBJECTS':
      return {
        ...state,
        isFetching: false,
        items: action.subjects,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SUBJECTS':
      return {
        ...state,
        currentView: 'subjects',
        selectedSchool: action.schoolId
      };
    case 'SHOW_COURSES':
      return {
        ...state,
        currentView: 'courses',
        selectedSubject: action.subjectId
      };
    case 'REQUEST_SCHOOLS':
    case 'RECEIVE_SCHOOLS':
      return {
        ...state,
        data: {
          schools: schools(state.data.schools, action),
          subjects: subjects(state.data.subjects, action)
        }
      };
    default:
      return state;
  }
}

export default reducer;
