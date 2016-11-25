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

export function requestSubjects() {
  return {
    type: 'REQUEST_SUBJECTS'
  };
}

export function receiveSubjects(json) {
  return {
    type: 'RECEIVE_SUBJECTS',
    subjects: json,
    receivedAt: Date.now()
  };
}

export function fetchSubjects(schoolId) {
  return function (dispatch) {
    dispatch(requestSubjects());
    return fetch('/data/subjects/' + schoolId)
      .then(response => response.json())
      .then(json => dispatch(receiveSubjects(json)));
  };
}
