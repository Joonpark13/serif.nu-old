import fetch from 'isomorphic-fetch';

export function showSubjects(schoolId) {
  return {
    type: 'SHOW_SUBJECTS',
    schoolId
  };
}

export function showCourses(subjectId) {
  return {
    type: 'SHOW_COURSES',
    subjectId
  };
}

export function requestSchools() {
  return {
    type: 'REQUEST_SCHOOLS'
  };
}

export function receiveSchools(json) {
  return {
    type: 'RECEIVE_SCHOOLS',
    schools: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function fetchSchools() {
  return function (dispatch) {
    dispatch(requestSchools());
    return fetch('http://www.northwestern.edu/class-descriptions/4650/index-v2.json')
      .then(response => response.json())
      .then(json => dispatch(receiveSchools(json)));
  };
}
