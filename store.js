import { createStore } from 'redux';
import browse from './reducers/browse';

const store = createStore(browse);

export default store;
