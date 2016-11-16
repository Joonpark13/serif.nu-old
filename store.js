import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import schools from './reducers/reducers';

const store = createStore(schools, applyMiddleware(thunkMiddleware));

export default store;
