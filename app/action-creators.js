import fetch from 'isomorphic-fetch';

export function showSubjects(schoolId) {
  return {
    type: 'SHOW_SUBJECTS',
    schoolId
  };
}

export function showCourses(subjectAbbv) {
  return {
    type: 'SHOW_COURSES',
    subjectAbbv
  };
}

export function showSections(courseAbbv) {
  return {
    type: 'SHOW_SECTIONS',
    courseAbbv
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
    return fetch(`/data/subjects/${schoolId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSubjects(json)));
  };
}

export function requestCourses() {
  return {
    type: 'REQUEST_COURSES'
  };
}

export function receiveCourses(json) {
  return {
    type: 'RECEIVE_COURSES',
    courses: json,
    receivedAt: Date.now()
  };
}

export function fetchCourses(schoolId, subjectAbbv) {
  return function (dispatch) {
    dispatch(requestCourses());
    return fetch(`/data/courses/${schoolId}/${subjectAbbv}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCourses(json)));
  };
}

export function requestSections() {
  return {
    type: 'REQUEST_SECTIONS'
  };
}

export function receiveSections(json) {
  return {
    type: 'RECEIVE_SECTIONS',
    courses: json,
    receivedAt: Date.now()
  };
}

export function fetchSections(schoolId, subjectAbbv, courseAbbv) {
  return function (dispatch) {
    dispatch(requestSections());
    return fetch(`/data/sections/${schoolId}/${subjectAbbv}/${courseAbbv}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSections(json)));
  };
}
