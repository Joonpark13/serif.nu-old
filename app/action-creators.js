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
    schools: json,
    receivedAt: Date.now()
  };
}

export function fetchSchools() {
  return function (dispatch) {
    dispatch(requestSchools());
    return fetch('/data/schools')
      .then(response => response.json())
      .then(json => dispatch(receiveSchools(json)));
  };
}
