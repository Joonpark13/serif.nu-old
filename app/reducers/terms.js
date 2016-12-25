import { initialData } from './helpers';

const initialTerms = {
  terms: initialData,
  currentTerm: ''
};

function findMaxId(terms) {
  let max = '0';
  terms.forEach((term) => {
    if (term.id > max) max = term.id;
  });
  return max;
}

function termHelper(state = {}, action) {
  switch(action.type) {
    case 'REQUEST_TERMS':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_TERMS':
      return {
        ...state,
        isFetching: false,
        items: action.terms,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function terms(state = initialTerms, action) {
  switch (action.type) {
    case 'REQUEST_TERMS':
      return {
        terms: termHelper(state.terms, action),
        currentTerm: state.currentTerm
      };
    case 'RECEIVE_TERMS':
      return {
        terms: termHelper(state.terms, action),
        currentTerm: findMaxId(action.terms)
      };
    case 'CHANGE_TERM':
      return {
        terms: state.terms,
        currentTerm: action.termId
      };
    default:
      return state;
  }
}

export default terms;
