import {
  initialSelected,
  initialData,
  initialDataDetails,
  schools,
  subjects,
  courses,
  sections,
  details
} from './helpers';

const initialBrowse = {
  currentView: 'schools',
  selected: initialSelected,
  data: {
    schools: initialData,
    subjects: initialData,
    courses: initialData,
    sections: initialData,
    details: initialDataDetails
  }
};

function browse(state = initialBrowse, action) {
  let newState = {};
  switch (action.type) {
    case 'SHOW_SCHOOLS':
      newState = {
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
      };
      break;
    case 'SHOW_SUBJECTS':
      newState = {
        currentView: 'subjects',
        selected: {
          school: action.schoolId,
          subject: '',
          course: '',
          section: ''
        }
      };
      break;
    case 'SHOW_COURSES':
      newState = {
        currentView: 'courses',
        selected: {
          subject: action.subjectAbbv,
          course: '',
          section: ''
        }
      };
      break;
    case 'SHOW_SECTIONS':
      newState = {
        currentView: 'sections',
        selected: {
          course: action.courseAbbv,
          section: ''
        }
      };
      break;
    case 'ADD_COURSE':
      newState = {
        selected: {
          section: action.section.id
        }
      };
      break;
    case 'ADD_COMPONENT':
      newState = {
        currentView: 'courses',
        selected: {
          course: '',
          section: ''
        }
      };
      break;
    case 'REQUEST_SCHOOLS':
    case 'RECEIVE_SCHOOLS':
      newState = {
        data: {
          schools: schools(state.data.schools, action)
        }
      };
      break;
    case 'REQUEST_SUBJECTS':
    case 'RECEIVE_SUBJECTS':
      newState = {
        data: {
          subjects: subjects(state.data.subjects, action)
        }
      };
      break;
    case 'REQUEST_COURSES':
    case 'RECEIVE_COURSES':
      newState = {
        data: {
          courses: courses(state.data.courses, action)
        }
      };
      break;
    case 'REQUEST_SECTIONS':
    case 'RECEIVE_SECTIONS':
      newState = {
        data: {
          sections: sections(state.data.sections, action)
        }
      };
      break;
    case 'REQUEST_DETAILS':
      newState = {
        data: {
          details: details(state.data.details, action)
        }
      };
      break;
    case 'RECEIVE_DETAILS':
      newState = {
        // If there are components to select, show components
        // If not, go back to course view
        currentView: action.details[0].associated_classes ? 'components' : 'courses',
        selected: {
          course: action.details[0].associated_classes ? state.selected.course : '',
          section: action.details[0].associated_classes ? state.selected.section : ''
        },
        data: {
          details: details(state.data.details, action)
        }
      };
      break;
    default:
      return state;
  }
  return $.extend(true, {}, state, newState);
}

export default browse;
