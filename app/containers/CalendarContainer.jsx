import { connect } from 'react-redux';

import Calendar from '../components/Calendar.jsx';

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
    if (ampm === 'PM') {
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

const parseSections = (sections) => {
    let events = [];
    sections.forEach((section) => {
        events = events.concat({
            id: section.id,
            title: section.name,
            ...parseMeetingTime(section.meeting_time[0])
        });
    });
    return events;
};

const parseComponents = (components) => {
    let events = [];
    components.forEach((comp) => {
        events = events.concat({
            id: comp.id,
            title: comp.title,
            ...parseMeetingTime(comp.meeting_time)
        });
    })
    return events;
};

const parseClasses = (calendar) => {
    const sections = parseSections(calendar.sections);
    const components = parseComponents(calendar.components);
    return sections.concat(components);
};

const mapStateToProps = (state) => ({
    coursecomps: parseClasses(state.calendar)
});

const CalendarContainer = connect(mapStateToProps)(Calendar);

export default CalendarContainer;
