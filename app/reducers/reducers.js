import { combineReducers } from 'redux';
import browse from './browse';
import search from './search';
import calendar from './calendar';

const reducer = combineReducers({
  browse,
  search,
  calendar
});

export default reducer;
