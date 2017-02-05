import fetch from 'isomorphic-fetch';

export function showSchools() {
  return {
    type: 'SHOW_SCHOOLS'
  };
}

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

export function addCourse(section) {
  return {
    type: 'ADD_COURSE',
    section
  };
}

export function addCourseSearch(section) {
  return {
    type: 'ADD_COURSE_SEARCH',
    section
  };
}

export function addComponent(detail) {
  return {
    type: 'ADD_COMPONENT',
    detail
  };
}

export function addComponentSearch(detail) {
  return {
    type: 'ADD_COMPONENT_SEARCH',
    detail
  };
}

export function addComponentCart(detail) {
  return {
    type: 'ADD_COMPONENT_CART',
    detail
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

export function fetchSchools(currentTerm) {
  return function (dispatch) {
    dispatch(requestSchools());
    return fetch(`/data/${currentTerm}/schools`)
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

export function fetchSubjects(currentTerm, schoolId) {
  return function (dispatch) {
    dispatch(requestSubjects());
    return fetch(`/data/${currentTerm}/subjects/${schoolId}`)
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

export function fetchCourses(currentTerm, schoolId, subjectAbbv) {
  return function (dispatch) {
    dispatch(requestCourses());
    return fetch(`/data/${currentTerm}/courses/${schoolId}/${subjectAbbv}`)
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
    sections: json,
    receivedAt: Date.now()
  };
}

export function fetchSections(currentTerm, schoolId, subjectAbbv, courseAbbv) {
  return function (dispatch) {
    dispatch(requestSections());
    return fetch(`/data/${currentTerm}/sections/${schoolId}/${subjectAbbv}/${courseAbbv}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSections(json)));
  };
}

export function requestSectionsSearch() {
  return {
    type: 'REQUEST_SECTIONS_SEARCH'
  };
}

export function receiveSectionsSearch(json) {
  return {
    type: 'RECEIVE_SECTIONS_SEARCH',
    sections: json,
    receivedAt: Date.now()
  };
}

export function fetchSectionsSearch(currentTerm, schoolId, subjectAbbv, courseAbbv) {
  return function (dispatch) {
    dispatch(requestSectionsSearch());
    return fetch(`/data/${currentTerm}/sections/${schoolId}/${subjectAbbv}/${courseAbbv}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSectionsSearch(json)));
  };
}

export function requestDetails() {
  return {
    type: 'REQUEST_DETAILS'
  };
}

export function receiveDetails(json) {
  return {
    type: 'RECEIVE_DETAILS',
    details: json,
    receivedAt: Date.now()
  };
}

export function fetchDetails(currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId) {
  return function (dispatch) {
    dispatch(requestDetails());
    return fetch(`/data/${currentTerm}/details/${schoolId}/${subjectAbbv}/${courseAbbv}/${sectionId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveDetails(json)));
  };
}

export function requestDetailsSearch() {
  return {
    type: 'REQUEST_DETAILS_SEARCH'
  };
}

export function receiveDetailsSearch(json) {
  return {
    type: 'RECEIVE_DETAILS_SEARCH',
    details: json,
    receivedAt: Date.now()
  };
}

export function fetchDetailsSearch(currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId) {
  return function (dispatch) {
    dispatch(requestDetailsSearch());
    return fetch(`/data/${currentTerm}/details/${schoolId}/${subjectAbbv}/${courseAbbv}/${sectionId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveDetailsSearch(json)));
  };
}

export function requestDetailsCart() {
  return {
    type: 'REQUEST_DETAILS_CART'
  };
}

export function receiveDetailsCart(json) {
  return {
    type: 'RECEIVE_DETAILS_CART',
    details: json,
    receivedAt: Date.now()
  };
}

export function fetchDetailsCart(currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId) {
  return function (dispatch) {
    dispatch(requestDetailsCart());
    return fetch(`/data/${currentTerm}/details/${schoolId}/${subjectAbbv}/${courseAbbv}/${sectionId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveDetailsCart(json)));
  };
}

export function requestSearchData() {
  return {
    type: 'REQUEST_SEARCH_DATA'
  };
}

export function receiveSearchData(json) {
  return {
    type: 'RECEIVE_SEARCH_DATA',
    searchData: json,
    receivedAt: Date.now()
  };
}

export function fetchSearchData(currentTerm) {
  return function (dispatch) {
    dispatch(requestSearchData());
    return fetch(`/data/${currentTerm}/search`)
      .then(response => response.json())
      .then(json => dispatch(receiveSearchData(json)));
  };
}

export function populateSelected(schoolId, subjectAbbv, courseAbbv) {
  return {
    type: 'POPULATE_SELECTED',
    school: schoolId,
    subject: subjectAbbv,
    course: courseAbbv
  };
}

export function remove(sectionId) {
  return {
    type: 'REMOVE',
    sectionId
  };
}

export function swapComponent(schoolId, subjectAbbv, courseAbbv, sectionId) {
  return {
    type: 'SWAP_COMPONENT',
    schoolId,
    subjectAbbv,
    courseAbbv,
    sectionId
  };
}

export function selectEvent(coursecomps) {
  return {
    type: 'SELECT_EVENT',
    coursecomps
  };
}

export function closeEventDialog() {
  return {
    type: 'CLOSE_EVENT_DIALOG'
  };
}

export function showCart() {
  return {
    type: 'SHOW_CART'
  };
}

export function changeTab(value) {
  return {
    type: 'CHANGE_TAB',
    tab: value
  };
}

export function addCourseHover(section) {
  return {
    type: 'ADD_COURSE_HOVER',
    section
  };
}

export function addComponentHover(detail) {
  return {
    type: 'ADD_COMPONENT_HOVER',
    detail
  };
}

export function removeHover(sectionId) {
  return {
    type: 'REMOVE_HOVER',
    sectionId
  };
}

export function showSearch() {
  return {
    type: 'SHOW_SEARCH'
  };
}

export function onFirstVisit() {
  return {
    type: 'ON_FIRST_VISIT'
  };
}

export function changeTerm(termId) {
  return {
    type: 'CHANGE_TERM',
    termId
  };
}

export function requestTerms() {
  return {
    type: 'REQUEST_TERMS'
  };
}

export function receiveTerms(json) {
  return {
    type: 'RECEIVE_TERMS',
    terms: json,
    receivedAt: Date.now()
  };
}

export function fetchTerms() {
  return function (dispatch) {
    dispatch(requestTerms());
    return fetch('/data/terms')
      .then(response => response.json())
      .then(json => dispatch(receiveTerms(json)));
  };
}

export function firstCalendar() {
  return {
    type: 'FIRST_CALENDAR'
  };
}

export const addCalendar = () => ({
  type: 'ADD_CALENDAR'
});

export const changeCalendar = (calId) => ({
  type: 'CHANGE_CALENDAR',
  calId
});

export const setCalendarName = (name) => ({
  type: 'SET_CALENDAR_NAME',
  name
});

export const removeCalendar = () => ({
  type: 'REMOVE_CALENDAR'
});

export const removeAll = () => ({
  type: 'REMOVE_ALL'
});

export const closeSnackbar = () => ({
  type: 'CLOSE_SNACKBAR'
});

export const googleCalendar = () => ({
  type: 'GOOGLE_CALENDAR'
});

export const facebookPosted = () => ({
  type: 'FACEBOOK_POSTED'
});

export const regalSent = () => ({
  type: 'REGAL_SENT'
});

export const requestRegal = () => ({
    type: 'REQUEST_REGAL'
});

export const receiveRegal = (hasRegal) => ({
    type: 'RECEIVE_REGAL',
    hasRegal
});

export const fetchRegal = () => (
  function (dispatch) {
    dispatch(requestRegal());
    return chrome.runtime.sendMessage(
      'mkdokopdmkonfilpmjjpdcmedmnhjgie',
      { message: 'installed' },
      (reply) => {
        if (reply && reply.installed) {
          dispatch(receiveRegal(true));
        } else {
          dispatch(receiveRegal(false));
        }
      }
    );
  }
);
