import { connect } from 'react-redux';

import CalendarWrapper from '../components/CalendarWrapper.jsx';
import { selectEvent, remove, closeEventDialog, fetchDetailsCart, swapComponent, showCart } from '../action-creators';
import {
    northwesternPurple30,
    brightGreen, brightCyan, brightBlue, brightYellow, brightOrange, brightRed,
    darkGreen, darkCyan, darkBlue, darkYellow, darkOrange, darkRed
} from '../colors';

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
    if (meetingTime === 'TBA') return { unscheduled: true };
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
        id: section.id,
        title: section.name,
        ...parseMeetingTime(section.meeting_time[0])
    };
};

const parseSections = (sections) => {
    let events = [];
    sections.forEach((section, index) => {
        events = events.concat({
            color: colorArray[index % colorArray.length],
            ...parseSection(section)
        });
    });
    return events;
};

const parseComponent = (comp) => {
    if (!comp) return null;
    return {
        id: comp.id,
        title: comp.title,
        ...parseMeetingTime(comp.meeting_time)
    };
};

const parseComponents = (components) => {
    let events = [];
    components.forEach((comp, index) => {
        events = events.concat({
            color: colorArray[index % colorArray.length],
            ...parseComponent(comp)
        });
    });
    return events;
};

const parseClasses = (calendar) => {
    const sections = parseSections(calendar.sections);
    const components = parseComponents(calendar.components);
    return sections.concat(components);
};

const addHoverColor = (coursecomp) => {
    if (!coursecomp) return null;
    coursecomp.color = northwesternPurple30;
    return coursecomp;
}

const mapStateToProps = (state) => ({
    coursecomps: parseClasses(state.calendar),
    eventOpen: state.calendar.eventOpen,
    selectedEvents: state.calendar.selectedEvents,
    sections: state.calendar.sections,
    components: state.calendar.components,
    hoverSection: addHoverColor(parseSection(state.calendar.hover.section)),
    hoverComponent: addHoverColor(parseComponent(state.calendar.hover.component))
});

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
    swapComponent: (schoolId, subjectAbbv, courseAbbv, sectionId) => {
        dispatch(fetchDetailsCart(schoolId, subjectAbbv, courseAbbv, sectionId));
        dispatch(showCart());
        dispatch(closeEventDialog());
        dispatch(swapComponent(schoolId, subjectAbbv, courseAbbv, sectionId));
    },
});

const CalendarContainer = connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);

export default CalendarContainer;
