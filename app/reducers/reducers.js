import { combineReducers } from 'redux';
import browse from './browse';
import search from './search';
import calendar from './calendar';
import cart from './cart';

function selectingComponent(state = false, action) {
  switch (action.type) {
    case 'RECEIVE_DETAILS':
    case 'RECEIVE_DETAILS_SEARCH':
    case 'RECEIVE_DETAILS_CART':
      return !!action.details[0].associated_classes; // Convert to bool
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

const reducer = combineReducers({
  browse,
  search,
  calendar,
  cart,
  selectingComponent,
  tabState
});

export default reducer;
