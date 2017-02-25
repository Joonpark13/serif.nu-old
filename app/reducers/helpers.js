import { fromJS } from 'immutable';

export const initialSelected = {
  school: '',
  subject: '',
  course: '',
  section: ''
};

export const initialData = {
  isFetching: false,
  lastUpdated: 0,
  items: []
};

// When modifying calendar initial state, you must also correspondingly
// modify the persisted state in store.js
export const initialCalendar = fromJS({
  currentCalendar: 1,
  sections: [],
  components: [],
  customEvents: [],
  hover: {
    section: null,
    component: null
  },
  eventOpen: false,
  selectedEvents: {}
});

export function schools(state = {}, action) {
  switch (action.type) {
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

export function subjects(state = {}, action) {
  switch (action.type) {
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

export function courses(state = {}, action) {
  switch (action.type) {
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

export function sections(state = {}, action) {
  switch (action.type) {
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

export function searchHandler(state = {}, action) {
  switch (action.type) {
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
