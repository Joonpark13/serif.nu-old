import { List } from 'immutable';

export const getCourseName = (courses, abbv) => (
  courses.find(course => course.abbv === abbv).name
);

export const matchId = (id) => (
  (component) => (id === component.id)
);

export const findCalObj = (classes, currentTerm, currentCalendar) => {
  // Find the corresponding term object
  const matchTerm = classes.find(term => term.get('id') === currentTerm);
  // Find the corresponding calendar object
  if (matchTerm) {
    return matchTerm.get('items').find(cal => cal.get('id') === currentCalendar);
  }
  return matchTerm; // undefined
};

export const findData = (classes, currentTerm, currentCalendar) => {
  const calObj = findCalObj(classes, currentTerm, currentCalendar);
  if (calObj) return calObj.get('data');
  return List([]);
};

export const inCalendar = (classes, id, currentTerm, currentCalendar) => {
  const data = findData(classes, currentTerm, currentCalendar);
  return data.toJS().some(coursecomp => coursecomp.id === id);
};

export const findSelected = (sections, components, id) => {
  // sections and components should be an Immutable List
  const selected = {};
  sections.map(section => {
    if (section.get('id') === id) selected.section = section.toJS();
  });
  components.map(component => {
    if (component.get('id') === id) selected.component = component.toJS();
  });
  return selected;
};

export const parseDow = (dow) => {
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

export const parseTime = (time) => {
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

export const parseMeetingTime = (meetingTime) => {
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

export const parseSection = (section) => {
    if (!section) return null;
    return {
        id: section.get('id'),
        title: section.get('name'),
        ...parseMeetingTime(section.get('meeting_time').get(0))
    };
};

export const parseComponent = (comp) => {
    if (!comp) return null;
    return {
        id: comp.get('id'),
        title: comp.get('title'),
        ...parseMeetingTime(comp.get('meeting_time'))
    };
};

