const initialState = {
    currentView: 'schools',
    selected: {
      school: '',
      subject: '',
      course: ''
    },
    calendar: {
      sections: [],
      components: []
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
      },
      sections: {
        isFetching: false,
        lastUpdated: 0,
        items: []
      },
      details: {
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

function sections(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_SECTIONS':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_SECTIONS':
      return {
        ...state,
        isFetching: false,
        items: action.sections,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function details(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_DETAILS':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_DETAILS':
      return {
        ...state,
        isFetching: false,
        info: action.details[0],
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
          subject: '',
          course: ''
        }
      };
    case 'SHOW_COURSES':
      return {
        ...state,
        currentView: 'courses',
        selected: {
          school: state.selected.school,
          subject: action.subjectAbbv,
          course: ''
        }
      };
    case 'SHOW_SECTIONS':
      return {
        ...state,
        currentView: 'sections',
        selected: {
          school: state.selected.school,
          subject: state.selected.subject,
          course: action.courseAbbv
        }
      };
    case 'ADD_COURSE':
      return {
        ...state,
        calendar: {
          sections: state.calendar.sections.concat(action.section),
          components: state.calendar.components
        }
      };
    case 'ADD_COMPONENT':
      return {
        ...state,
        calendar: {
          sections: state.calendar.sections,
          components: state.calendar.components.concat(action.detail)
        }
      };
    case 'REQUEST_SCHOOLS':
    case 'RECEIVE_SCHOOLS':
      return {
        ...state,
        data: {
          schools: schools(state.data.schools, action),
          subjects: state.data.subjects,
          courses: state.data.courses,
          sections: state.data.sections,
          details: state.data.details
        }
      };
    case 'REQUEST_SUBJECTS':
    case 'RECEIVE_SUBJECTS':
      return {
        ...state,
        data: {
          schools: state.data.schools,
          subjects: subjects(state.data.subjects, action),
          courses: state.data.courses,
          sections: state.data.sections,
          details: state.data.details
        }
      };
    case 'REQUEST_COURSES':
    case 'RECEIVE_COURSES':
      return {
        ...state,
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: courses(state.data.courses, action),
          sections: state.data.sections,
          details: state.data.details
        }
      };
    case 'REQUEST_SECTIONS':
    case 'RECEIVE_SECTIONS':
      return {
        ...state,
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: state.data.courses,
          sections: sections(state.data.sections, action),
          details: state.data.details
        }
      };
    case 'REQUEST_DETAILS':
      return {
        ...state,
        selected: {
          school: state.selected.school,
          subject: state.selected.subject,
          course: state.selected.course
        },
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: state.data.courses,
          sections: state.data.sections,
          details: details(state.data.details, action)
        }
      }
    case 'RECEIVE_DETAILS':
      return {
        ...state,
        currentView: action.details[0].associated_classes ? 'components' : 'courses',
        selected: {
          school: state.selected.school,
          subject: state.selected.subject,
          course: action.details[0].associated_classes ? state.selected.course : ''
        },
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: state.data.courses,
          sections: state.data.sections,
          details: details(state.data.details, action)
        }
      };
    default:
      return state;
  }
}

export default reducer;
