import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import reducer from './reducers/reducers';
import { fromJS } from 'immutable';

import { initialCalendar } from './reducers/helpers';

const localStorageVersion = '2';
const setVersion = (state, version) => {
    const subState = {};
    subState[version] = {
        calendar: {
            sections: state.calendar.get('sections'),
            components: state.calendar.get('components'),
            currentCalendar: state.calendar.get('currentCalendar'),
            hover: initialCalendar.get('hover'),
            eventOpen: initialCalendar.get('eventOpen'),
            selectedEvents: initialCalendar.get('selectedEvents')
        },
        firstVisit: state.firstVisit
    };
    return subState;
};

const config = {
    // Only keep
    // state.calendar.sections,
    // state.calendar.components,
    // state.calendar.currentCalendar,
    // and state.firstVisit
    slicer: (paths) => (
        (state) => (setVersion(state, localStorageVersion))
    ),
    deserialize: (data) => {
        const parsed = JSON.parse(data)[localStorageVersion];
        if (parsed) parsed.calendar = fromJS(parsed.calendar);
        return parsed;
    }
};

let composeEnhancers;
if (process.env.NODE_ENV === 'production') {
    composeEnhancers = compose;
} else {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware),
        persistState(['calendar', 'firstVisit'], config)
    )
);

export default store;
