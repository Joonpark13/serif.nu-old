import $ from 'jquery';
import {
  initialSelected,
  initialData,
  initialDataDetails,
  sections,
  details,
  searchHandler
} from './helpers';

const initialSearch = {
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
};

function search(state = initialSearch, action) {
  let newState = {};
  switch (action.type) {
    case 'ADD_COURSE_SEARCH':
      newState = {
        selected: {
          section: action.section.id
        }
      };
      break;
    case 'ADD_COMPONENT_SEARCH':
      newState = {
        currentView: 'search',
        selected: {
          course: '',
          section: ''
        }
      };
      break;
    case 'REQUEST_SECTIONS_SEARCH':
    case 'RECEIVE_SECTIONS_SEARCH':
      return { // Do not deep copy
        currentView: state.currentView,
        selected: state.selected,
        data: {
          autocomplete: state.data.autocomplete,
          school: state.data.school,
          subject: state.data.subject,
          course: state.data.course,
          sections: sections(state.data.sections, action),
          details: state.data.details
        }
      };
    case 'SHOW_COMPONENTS_SEARCH':
      newState = {
        currentView: 'components'
      };
      break;
    case 'REQUEST_SEARCH_DATA':
    case 'RECEIVE_SEARCH_DATA':
      newState = {
        data: {
          autocomplete: searchHandler(state.data.autocomplete, action),
        },
        currentView: state.currentView
      };
      break;
    case 'POPULATE_SELECTED':
      newState = {
        currentView: 'sections',
        selected: {
          school: action.school,
          subject: action.subject,
          course: action.course,
          section: ''
        }
      };
      break;
    case 'SHOW_SEARCH':
      return {
        currentView: 'search',
        selected: initialSelected,
        data: {
          autocomplete: state.data.autocomplete,
          school: '',
          subject: '',
          course: '',
          sections: initialData,
          details: initialDataDetails
        }
      };
    case 'CHANGE_TERM':
      return initialSearch;
    case 'ADD_CALENDAR':
    case 'CHANGE_CALENDAR':
      return {
        currentView: initialSearch.currentView,
        selected: initialSelected,
        data: state.data
      };
    default:
      return state;
  }
  return $.extend(true, {}, state, newState); // Deep copy
}

export default search;
