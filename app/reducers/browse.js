import $ from 'jquery';
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
  // newState will be deepcopied with state into a new object and returned
  // unless otherwise specified
  let newState = {};
  switch (action.type) {
    case 'SHOW_SCHOOLS':
      return { // Do not deep copy
        currentView: 'schools',
        selected: initialSelected,
        data: {
          schools: state.data.schools,
          subjects: initialData,
          courses: initialData,
          sections: initialData,
          details: initialDataDetails
        }
      };
    case 'SHOW_SUBJECTS':
      return { // Do not deep copy
        currentView: 'subjects',
        selected: {
          school: action.schoolId,
          subject: '',
          course: '',
          section: ''
        },
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: initialData,
          sections: initialData,
          details: initialDataDetails
        }
      };
    case 'SHOW_COURSES':
      return { // Do not deep copy
        currentView: 'courses',
        selected: {
          school: state.selected.school,
          subject: action.subjectAbbv,
          course: '',
          section: ''
        },
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: state.data.courses,
          sections: initialData,
          details: initialDataDetails
        }
      };
    case 'SHOW_SECTIONS':
      return { // Do not deep copy
        currentView: 'sections',
        selected: {
          school: state.selected.school,
          subject: state.selected.subject,
          course: action.courseAbbv,
          section: ''
        },
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: state.data.courses,
          sections: state.data.sections,
          details: initialDataDetails
        }
      };
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
      return { // Do not deep copy
        currentView: state.currentView,
        selected: state.selected,
        data: {
          schools: state.data.schools,
          subjects: state.data.subjects,
          courses: state.data.courses,
          sections: sections(state.data.sections, action),
          details: initialDataDetails
        }
      };
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
    case 'CHANGE_TERM':
      return initialBrowse;
    default:
      return state;
  }
  return $.extend(true, {}, state, newState); // Deep (recursive) copy
}

export default browse;
