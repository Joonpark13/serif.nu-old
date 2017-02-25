import browse from './browse';
import search from './search';
import calendar from './calendar';
import cart from './cart';
import terms from './terms';
import snackbar from './snackbar';

function selectingComponent(state = false, action) {
  switch (action.type) {
    case 'SHOW_COMPONENTS_SEARCH':
    case 'SHOW_COMPONENTS_BROWSE':
    case 'SWAP_COMPONENT':
      return true;
    case 'ADD_COMPONENT':
    case 'ADD_COMPONENT_SEARCH':
    case 'ADD_COMPONENT_CART':
      return false;
    default:
      return state;
  }
}

function tabState(state = 'search', action) {
  switch (action.type) {
    case 'SHOW_CART':
      return 'cart';
    case 'CHANGE_TAB':
      return action.tab;
    default:
      return state;
  }
}

function firstVisit(state = true, action) {
  switch (action.type) {
    case 'ON_FIRST_VISIT':
      return false;
    default:
      return state;
  }
}

const hasRegal = (state = false, action) => {
  switch (action.type) {
    case 'RECEIVE_REGAL':
      return action.hasRegal;
    case 'REQUEST_REGAL':
    default:
      return state;
  }
};

const reducer = (state = {}, action) => {
  const currentTerm = state.terms ? state.terms.currentTerm : '';
  return {
    browse: browse(state.browse, action),
    search: search(state.search, action),
    calendar: calendar(state.calendar, action, currentTerm),
    cart: cart(state.cart, action),
    selectingComponent: selectingComponent(state.selectingComponent, action),
    tabState: tabState(state.tabState, action),
    firstVisit: firstVisit(state.firstVisit, action),
    terms: terms(state.terms, action),
    snackbar: snackbar(state.snackbar, action),
    hasRegal: hasRegal(state.hasRegal, action)
  };
};

export default reducer;
