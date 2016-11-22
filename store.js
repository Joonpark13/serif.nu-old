import { createStore } from 'redux';
import browse from './reducers/browse';

const store = createStore(browse, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
