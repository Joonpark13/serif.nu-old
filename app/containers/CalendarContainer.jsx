import { connect } from 'react-redux';
import moment from 'moment';

import CalendarWrapper from '../components/CalendarWrapper.jsx';
import {
    selectEvent,
    remove,
    closeEventDialog,
    swapComponent,
    showCart,
    setCalendarName,
    googleCalendar,
    facebookPosted,
    regalSent
} from '../action-creators';
import {
    northwesternPurple30,
    brightGreen, brightCyan, brightBlue, brightYellow, brightOrange, brightRed,
    darkGreen, darkCyan, darkBlue, darkYellow, darkOrange, darkRed
} from '../colors';
import { findCalObj, findData, parseTime, parseSection, parseComponent } from '../helpers';

const colorArray = [brightGreen, brightOrange, brightBlue, brightYellow, brightCyan, brightRed,
    darkGreen, darkOrange, darkBlue, darkYellow, darkCyan, darkRed
];

const parseSections = (sections) => {
    const events = [];
    sections.map(section => {
        events.push({
            color: colorArray[sections.indexOf(section) % colorArray.length],
            ...parseSection(section)
        });
    });
    return events;
};

const parseComponents = (components, sections) => {
    let events = [];
    components.map(comp => {
        // Make sure the component has the same color as the corresponding section
        let sectionIndex = '';
        sections.map(section => {
            if (section.get('id') === comp.get('id')) sectionIndex = sections.indexOf(section);
        });
        events.push({
            color: colorArray[sectionIndex % colorArray.length],
            ...parseComponent(comp)
        });
    });
    return events;
};

const findCustomEvents = (customEvents, currentTerm, currentCalendar) => {
    // customEvents is an Immutable JS List

    // return customEvents that match the current term and calendar
    return customEvents.filter(customEvent => 
        customEvent.get('termId') === currentTerm
        && customEvent.get('calendarId') === currentCalendar
    );
};

const parseCustomEvents = (customEvents) => {
    // return the customEvents formatted in the Fullcalendar format
    return customEvents.map(customEvent => {
        const dow = [];
        customEvent.get('daysOfWeek').forEach((dayOfWeek, index) => {
            // daysOfWeek contains a list of five booleans, representing
            // Monday through Friday. Fullcalendar represents Sunday as 0,
            // Monday as 1, and so on (hence we add 1 to the index).
            if (dayOfWeek) dow.push(index + 1);
        });
        // parse start and end times
        const start = moment(customEvent.get('start')).format('kk:mm:00'); // kk for 24 hr format
        const end = moment(customEvent.get('end')).format('kk:mm:00');
        return {
            id: customEvent.get('id'),
            title: customEvent.get('eventName'),
            dow,
            start,
            end
        };
    });
};

const parseClasses = (calendar, currentTerm, currentCalendar) => {
    let sections = findData(calendar.get('sections'), currentTerm, currentCalendar);
    let components = findData(calendar.get('components'), currentTerm, currentCalendar);
    const customEvents = findCustomEvents(calendar.get('customEvents'), currentTerm, currentCalendar);
    return parseSections(sections)
        .concat(parseComponents(components, sections))
        .concat(parseCustomEvents(customEvents).toJS());
};

const addHoverColor = (coursecomp) => {
    if (!coursecomp) return null;
    coursecomp.color = northwesternPurple30;
    return coursecomp;
};

const getCurrentCalendarName = (sections, currentTerm, currentCalendar) => {
    const cal = findCalObj(sections, currentTerm, currentCalendar);
    if (cal) return cal.get('name');
    return '';
};

const findTermObj = (items, currentTerm) => {
    return items.find(term => term.id === currentTerm);
};

const everyTwoInsert = (target, char) => {
    return target.match(/.{1,2}/g).join(',');
};

const addEvents = (type, section, term) => {
    // Don't add unschedule classes
    if (type === 'section') {
        if (startTimeStr = section.getIn(['class_mtg_info', 0, 'meet_t']) === 'TBA') return;
    } else if (type === 'component') {
        if (startTimeStr = section.getIn(['class_mtg_info', 0, 'meet_t']) === 'TBA') return;
    }

    let startTimeStr = '';
    let endTimeStr = '';
    let summary = '';
    let days = '';
    let description = '';
    let location = '';
    if (type === 'section') {
        // meeting_time[0] format example: MoWeFr 10:00AM - 10:50AM
        startTimeStr = section.getIn(['class_mtg_info', 0, 'meet_t']).split(' ')[1];
        // startTimeStr format example: 10:00AM
        endTimeStr = section.getIn(['class_mtg_info', 0, 'meet_t']).split(' ')[3];
        // endTimeStr format example: 10:50AM
        summary = section.get('name');
        days = everyTwoInsert(section.getIn(['class_mtg_info', 0, 'meet_t']).split(' ')[0].toUpperCase(), ',');
        description = section.get('overview_of_class');
        location = section.get('location');
    } else if (type === 'component') {
        // meeting_time format example: MoWeFr 10:00AM - 10:50AM
        startTimeStr = section.get('meeting_time').split(' ')[1];
        // startTimeStr format example: 10:00AM
        endTimeStr = section.get('meeting_time').split(' ')[3];
        // endTimeStr format example: 10:50AM
        summary = section.get('title');
        days = everyTwoInsert(section.get('meeting_time').split(' ')[0].toUpperCase(), ',');
        // description intentionally missing - not provided from API
        location = section.get('room');
    }
    const startTime = parseTime(startTimeStr);
    // startTime format example: 10:00
    const startTimeFormatted = `${term.start}T${startTime}:00-06:00`; // -06:00 indicates UTC-6
    const d = new Date();

    const endTime = parseTime(endTimeStr);
    // endTime format example: 10:50
    const endTimeFormatted = `${term.start}T${endTime}:00-06:00`;

    const endDate = term.end.split('-').join('');

    gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: {
            summary,
            location,
            description,
            start: {
                dateTime: startTimeFormatted,
                timeZone: 'America/Chicago'
            },
            end: {
                dateTime: endTimeFormatted,
                timeZone: 'America/Chicago'
            },
            recurrence: [`RRULE:FREQ=WEEKLY;UNTIL=${endDate};BYDAY=${days}`]
        }
    }).execute(event => {
        // TODO: Implement snackbar confirmation.
    });
};

const mapStateToProps = (state) => {
    const sections = state.calendar.get('sections');
    const currentTerm = state.terms.currentTerm;
    const currentCalendar = state.calendar.get('currentCalendar');
    const currentTermObj = findTermObj(state.terms.terms.items, currentTerm);
    return {
        currentTerm,
        coursecomps: parseClasses(state.calendar, currentTerm, currentCalendar),
        eventOpen: state.calendar.get('eventOpen'),
        selectedEvents: state.calendar.get('selectedEvents'),
        sections: findData(sections, currentTerm, currentCalendar),
        components: findData(state.calendar.get('components'), currentTerm, currentCalendar),
        customEvents: findCustomEvents(state.calendar.get('customEvents'), currentTerm, currentCalendar),
        hoverSection: addHoverColor(parseSection(state.calendar.getIn(['hover', 'section']))),
        hoverComponent: addHoverColor(parseComponent(state.calendar.getIn(['hover', 'component']))),
        currentCalendarName: getCurrentCalendarName(sections, currentTerm, currentCalendar),
        currentTermObj,  // Only for mergeProps
        currentTermName: currentTermObj ? currentTermObj.term : undefined,
        hasRegal: state.hasRegal
    };
};

const mapDispatchToProps = (dispatch) => ({
    selectEvent: (coursecomps) => {
        dispatch(selectEvent(coursecomps));
    },
    remove: (sectionId) => {
        dispatch(remove(sectionId));
        dispatch(closeEventDialog());
    },
    closeDialog: () => {
        dispatch(closeEventDialog());
    },
    setCalendarName: (name) => {
        dispatch(setCalendarName(name));
    },
    swapComponent: (termId, schoolId, subjectAbbv, courseAbbv, sectionId) => {
        dispatch(showCart());
        dispatch(closeEventDialog());
        dispatch(swapComponent(schoolId, subjectAbbv, courseAbbv, sectionId));
    },
    googleCalendar: () => { // Only for mergeProps
        dispatch(googleCalendar()); // For confirmation snackbar
    },
    facebookPosted: () => {
        dispatch(facebookPosted());
    },
    regalSent: () => {
        dispatch(regalSent());
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return Object.assign({
        handleAuth: () => {
            gapi.auth.authorize({
                client_id: process.env.GOOGLE_API_CLIENT_ID,
                scope: ['https://www.googleapis.com/auth/calendar']
            }, (authResult) => {
                if (authResult && !authResult.error) {
                    gapi.client
                        .load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest')
                        .then(() => {
                            stateProps.sections.forEach(section => {
                                addEvents('section', section, stateProps.currentTermObj);
                            });
                            stateProps.components.forEach(component => {
                                addEvents('component', component, stateProps.currentTermObj);
                            });
                            dispatchProps.googleCalendar(); // For confirmation snackbar
                        });
                } else if (authResult) {
                    console.log(authResult.error);
                } else {
                    console.log('Google API Auth Error');
                }
            });
        }
    }, stateProps, dispatchProps);
};

const CalendarContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CalendarWrapper);

export default CalendarContainer;
