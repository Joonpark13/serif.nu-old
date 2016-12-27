import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import reducer from './reducers/reducers';
import { fromJS } from 'immutable';

import { initialCalendar } from './reducers/helpers';

const config = {
    // Only keep state.calendar.sections, state.calendar.components, and state.firstVisit
    slicer: (paths) => (
        (state) => ({
            calendar: {
                sections: state.calendar.get('sections'),
                components: state.calendar.get('components'),
                currentCalendar: initialCalendar.get('currentCalendar'),
                hover: initialCalendar.get('hover'),
                eventOpen: initialCalendar.get('eventOpen'),
                selectedEvents: initialCalendar.get('selectedEvents')
            },
            firstVisit: state.firstVisit
        })
    ),
    deserialize: (data) => {
        const parsed = JSON.parse(data);
        if (parsed) parsed.calendar = fromJS(parsed.calendar);
        return parsed;
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware),
        persistState(['firstVisit'], config)
    )
);

export default store;
