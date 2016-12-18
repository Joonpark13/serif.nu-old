const initialSelected = {
  school: '',
  subject: '',
  course: '',
  section: ''
};

const initialData = {
  isFetching: false,
  lastUpdated: 0,
  items: []
};

const initialDataDetails = {
  isFetching: false,
  lastUpdated: 0,
  info: {}
};

const initialState = {
  search: {
    currentView: 'search',
    selected: initialSelected,
    data: {
      autocomplete: initialData,
      school: '',
      subject: '',
      course: '',
      sections: initialData,
      details: initialDataDetails
    }
  },
  browse: {
    currentView: 'schools',
    selected: initialSelected,
    data: {
      schools: initialData,
      subjects: initialData,
      courses: initialData,
      sections: initialData,
      details: initialDataDetails
    }
  },
  calendar: {
    sections: [],
    components: []
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
    case 'REQUEST_SECTIONS_SEARCH':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_SECTIONS':
    case 'RECEIVE_SECTIONS_SEARCH':
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
    case 'REQUEST_DETAILS_SEARCH':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_DETAILS':
    case 'RECEIVE_DETAILS_SEARCH':
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

function search(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_SEARCH_DATA':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_SEARCH_DATA':
      return {
        ...state,
        isFetching: false,
        items: action.searchData,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case 'SHOW_SCHOOLS':
      newState = {
        browse: {
          currentView: 'schools',
          selected: {
            school: '',
            subject: '',
            course: '',
            section: ''
          },
          data: {
            subjects: initialData,
            courses: initialData,
            sections: initialData,
            details: initialDataDetails
          }
        }
      };
      break;
    case 'SHOW_SUBJECTS':
      newState = {
        browse: {
          currentView: 'subjects',
          selected: {
            school: action.schoolId,
            subject: '',
            course: '',
            section: ''
          }
        }
      };
      break;
    case 'SHOW_COURSES':
      newState = {
        browse: {
          currentView: 'courses',
          selected: {
            subject: action.subjectAbbv,
            course: '',
            section: ''
          }
        }
      };
      break;
    case 'SHOW_SECTIONS':
      newState = {
        browse: {
          currentView: 'sections',
          selected: {
            course: action.courseAbbv,
            section: ''
          }
        }
      };
      break;
    case 'ADD_COURSE':
      newState = {
        browse: {
          selected: {
            section: action.section.id
          }
        },
        calendar: {
          sections: state.calendar.sections.concat(action.section)
        }
      };
      break;
    case 'ADD_COURSE_SEARCH':
      newState = {
        search: {
          selected: {
            section: action.section.id
          }
        },
        calendar: {
          sections: state.calendar.sections.concat(action.section)
        }
      };
      break;
    case 'ADD_COMPONENT':
      newState = {
        browse: {
          currentView: 'courses',
          selected: {
            course: '',
            section: ''
          }
        },
        calendar: {
          components: state.calendar.components.concat(action.detail)
        }
      };
      break;
    case 'ADD_COMPONENT_SEARCH':
      newState = {
        search: {
          currentView: 'search',
          selected: {
            course: '',
            section: ''
          }
        },
        calendar: {
          components: state.calendar.components.concat(action.detail)
        }
      };
      break;
    case 'REQUEST_SCHOOLS':
    case 'RECEIVE_SCHOOLS':
      newState = {
        browse: {
          data: {
            schools: schools(state.browse.data.schools, action)
          }
        }
      };
      break;
    case 'REQUEST_SUBJECTS':
    case 'RECEIVE_SUBJECTS':
      newState = {
        browse: {
          data: {
            subjects: subjects(state.browse.data.subjects, action)
          }
        }
      };
      break;
    case 'REQUEST_COURSES':
    case 'RECEIVE_COURSES':
      newState = {
        browse: {
          data: {
            courses: courses(state.browse.data.courses, action)
          }
        }
      };
      break;
    case 'REQUEST_SECTIONS':
    case 'RECEIVE_SECTIONS':
      newState = {
        browse: {
          data: {
            sections: sections(state.browse.data.sections, action)
          }
        }
      };
      break;
    case 'REQUEST_SECTIONS_SEARCH':
    case 'RECEIVE_SECTIONS_SEARCH':
      newState = {
        search: {
          data: {
            sections: sections(state.browse.data.sections, action)
          }
        }
      };
      break;
    case 'REQUEST_DETAILS':
      newState = {
        browse: {
          data: {
            details: details(state.browse.data.details, action)
          }
        }
      };
      break;
    case 'RECEIVE_DETAILS':
      newState = {
        browse: {
          // If there are components to select, show components
          // If not, go back to course view
          currentView: action.details[0].associated_classes ? 'components' : 'courses',
          selected: {
            course: action.details[0].associated_classes ? state.browse.selected.course : '',
            section: action.details[0].associated_classes ? state.browse.selected.section : ''
          },
          data: {
            details: details(state.browse.data.details, action)
          }
        }
      };
      break;
    case 'REQUEST_DETAILS_SEARCH':
      newState = {
        search: {
          data: {
            details: details(state.browse.data.details, action)
          }
        }
      };
      break;
    case 'RECEIVE_DETAILS_SEARCH':
      newState = {
        search: {
          // If there are components to select, show components
          // If not, go back to course view
          currentView: action.details[0].associated_classes ? 'components' : 'courses',
          selected: {
            course: action.details[0].associated_classes ? state.search.selected.course : '',
            section: action.details[0].associated_classes ? state.search.selected.section : ''
          },
          data: {
            details: details(state.search.data.details, action)
          }
        }
      };
      break;
    case 'REQUEST_SEARCH_DATA':
    case 'RECEIVE_SEARCH_DATA':
      newState = {
        search: {
          data: {
            autocomplete: search(state.search.data.autocomplete, action),
          },
          currentView: state.search.currentView,
        }
      };
      break;
    case 'POPULATE_SELECTED':
      newState = {
        search: {
          currentView: 'sections',
          selected: {
            school: action.school,
            subject: action.subject,
            course: action.course,
            section: ''
          }
        }
      };
      break;
    default:
      return state;
  }
  return $.extend(true, {}, state, newState);
}

export default reducer;
