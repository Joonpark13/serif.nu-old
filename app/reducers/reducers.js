import { combineReducers } from 'redux';
import browse from './browse';
import search from './search';
import calendar from './calendar';
import cart from './cart';

const reducer = combineReducers({
  browse,
  search,
  calendar,
  cart
});

export default reducer;
