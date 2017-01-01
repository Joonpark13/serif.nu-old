import { connect } from 'react-redux';

import CalendarWrapper from '../components/CalendarWrapper.jsx';
import {
    selectEvent,
    remove,
    closeEventDialog,
    fetchDetailsCart,
    swapComponent,
    showCart,
    setCalendarName,
    removeCalendar,
    googleCalendar
} from '../action-creators';
import {
    northwesternPurple30,
    brightGreen, brightCyan, brightBlue, brightYellow, brightOrange, brightRed,
    darkGreen, darkCyan, darkBlue, darkYellow, darkOrange, darkRed
} from '../colors';
import { findCalObj, findData } from '../helpers';

const colorArray = [brightGreen, brightOrange, brightBlue, brightYellow, brightCyan, brightRed,
    darkGreen, darkOrange, darkBlue, darkYellow, darkCyan, darkRed
];

const parseDow = (dow) => {
    // Input examples: 'MoWeFr', 'TuTh', 'MoWe', etc
    // http://stackoverflow.com/questions/6259515/javascript-elegant-way-to-split-string-into-segments-n-characters-long
    const dowList = dow.match(/.{1,2}/g);
    const dowParsed = [];
    dowList.forEach((dowStr) => {
        switch(dowStr) {
            case 'Mo':
                dowParsed.push(1);
                break;
            case 'Tu':
                dowParsed.push(2);
                break;
            case 'We':
                dowParsed.push(3);
                break;
            case 'Th':
                dowParsed.push(4);
                break;
            case 'Fr':
                dowParsed.push(5);
                break;
        }
    });
    // ouput format: see dow from https://fullcalendar.io/docs/event_ui/eventConstraint/
    return dowParsed;
};

const parseTime = (time) => {
    // Input examples: '10:00AM', '5:50PM'
    const numeric = time.slice(0, -2);
    const ampm = time.slice(-2); // Last two letters

    const timeArray = numeric.split(':');
    let output;
    if (ampm === 'PM' && numeric.substring(0, 2) !== '12') { // 12PM noon should not have 12 added onto it
        timeArray[0] = (parseInt(timeArray[0]) + 12).toString();
        output = timeArray.join(':');
    } else {
        output = numeric;
    }

    // Make sure times that look like 5:00 end up 05:00
    if (output.length === 4) {
        return '0' + output;
    } else {
        return output;
    }
};

const parseMeetingTime = (meetingTime) => {
    if (!meetingTime || meetingTime === 'TBA') return { unscheduled: true };
    // Take API's formatted meeting_time and output the
    // start time, end time, and days of the week for
    // fullcalendar to accept as event objects.
    // returns: {
    //     start:
    //     end:
    //     dow:
    // }
    // Example expected format of input: MoWeFr 10:00AM - 10:50AM
    const split = meetingTime.split(' ');
    const dow = parseDow(split[0]);
    const start = `${parseTime(split[1])}:00`; // Arbitrary date that will always be before today
    const end = `${parseTime(split[3])}:00`;
    return { dow, start, end };
}

const parseSection = (section) => {
    if (!section) return null;
    return {
        id: section.get('id'),
        title: section.get('name'),
        ...parseMeetingTime(section.get('meeting_time').get(0))
    };
};

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

const parseComponent = (comp) => {
    if (!comp) return null;
    return {
        id: comp.get('id'),
        title: comp.get('title'),
        ...parseMeetingTime(comp.get('meeting_time'))
    };
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

const parseClasses = (calendar, currentTerm, currentCalendar) => {
    let sections = findData(calendar.get('sections'), currentTerm, currentCalendar);
    let components = findData(calendar.get('components'), currentTerm, currentCalendar);
    return parseSections(sections).concat(parseComponents(components, sections));
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

const checkIfOnlyCalendar = (sections, currentTerm) => {
    const term = sections.find(term => term.get('id') === currentTerm);
    if (term) return term.get('items').toJS().length === 1;
    return true;
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
        if (startTimeStr = section.getIn(['meeting_time', 0]) === 'TBA') return;
    } else if (type === 'component') {
        if (startTimeStr = section.get('meeting_time') === 'TBA') return;
    }

    let startTimeStr = '';
    let endTimeStr = '';
    let summary = '';
    let days = '';
    let description = '';
    let location = '';
    if (type === 'section') {
        // meeting_time[0] format example: MoWeFr 10:00AM - 10:50AM
        startTimeStr = section.getIn(['meeting_time', 0]).split(' ')[1];
        // startTimeStr format example: 10:00AM
        endTimeStr = section.getIn(['meeting_time', 0]).split(' ')[3];
        // endTimeStr format example: 10:50AM
        summary = section.get('name');
        days = everyTwoInsert(section.getIn(['meeting_time', 0]).split(' ')[0].toUpperCase(), ',');
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
    const startTimeFormatted = `${term.start}T${startTime}:00-06:00` // -06:00 indicates UTC-6

    const endTime = parseTime(endTimeStr);
    // endTime format example: 10:50
    const endTimeFormatted = `${term.start}T${endTime}:00-06:00`

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
    return {
        currentTerm,
        coursecomps: parseClasses(state.calendar, currentTerm, currentCalendar),
        eventOpen: state.calendar.get('eventOpen'),
        selectedEvents: state.calendar.get('selectedEvents').toJS(),
        sections: findData(sections, currentTerm, currentCalendar),
        components: findData(state.calendar.get('components'), currentTerm, currentCalendar),
        hoverSection: addHoverColor(parseSection(state.calendar.getIn(['hover', 'section']))),
        hoverComponent: addHoverColor(parseComponent(state.calendar.getIn(['hover', 'component']))),
        currentCalendarName: getCurrentCalendarName(sections, currentTerm, currentCalendar),
        onlyCalendar: checkIfOnlyCalendar(sections, currentTerm),
        currentTermObj: findTermObj(state.terms.terms.items, currentTerm) // Only for mergeProps
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
    removeCalendar: () => {
        dispatch(removeCalendar());
    },
    swapComponent: (termId, schoolId, subjectAbbv, courseAbbv, sectionId) => {
        dispatch(fetchDetailsCart(termId, schoolId, subjectAbbv, courseAbbv, sectionId));
        dispatch(showCart());
        dispatch(closeEventDialog());
        dispatch(swapComponent(schoolId, subjectAbbv, courseAbbv, sectionId));
    },
    googleCalendar: () => { // Only for mergeProps
        dispatch(googleCalendar()); // For confirmation snackbar
    },
    handleFacebook: () => {
        // FB.login(() => {
        //     FB.api('/me/photos', 'POST', {
        //         url: 'http:\/\/shushi168.com/data/out/255/35986723-white-background-image.png'
        //     }, (response) => {
        //         if (response && !response.error) {
        //             // TODO: Snackbar error message
        //         }
        //     });
        // }, {scope: 'publish_actions'});
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
