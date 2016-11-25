const initialState = {
    currentView: 'schools',
    selected: {
      school: '',
      subject: '',
      course: ''
    },
    data: {
      schools: {
        isFetching: false,
        lastUpdated: 0,
        items: []
      },
      subjects: {
        isFetching: false,
        lastUpdated: 0,
        items: []
      },
      courses: {
        isFetching: false,
        lastUpdated: 0,
        items: []
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

function courses(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_COURSES':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_COURSES':
      return {
        ...state,
        isFetching: false,
        items: action.courses,
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
        selected: {
          school: action.schoolId,
          subject: state.selected.subject,
          course: state.selected.course
        }
      };
    case 'SHOW_COURSES':
      return {
        ...state,
        currentView: 'courses',
        selectedSubject: action.subjectId,
        selected: {
          school: state.selected.school,
          subject: action.subjectAbbv,
          course: state.selected.course
        }
      };
    case 'REQUEST_SCHOOLS':
    case 'RECEIVE_SCHOOLS':
      return {
        ...state,
        data: {
          schools: schools(state.data.schools, action),
          subjects: state.data.subjects,
          courses: state.data.courses
        }
      };
    case 'REQUEST_SUBJECTS':
    case 'RECEIVE_SUBJECTS':
      return {
        ...state,
        data: {
          schools: state.data.schools,
          subjects: subjects(state.data.subjects, action),
          courses: state.data.courses
        }
      }
    case 'REQUEST_COURSES':
    case 'RECEIVE_COURSES':
      return {
        ...state,
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: courses(state.data.courses, action)
        }
      }
    default:
      return state;
  }
}

export default reducer;
