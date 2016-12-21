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
    sections: json,
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

export function fetchSectionsSearch(schoolId, subjectAbbv, courseAbbv) {
  return function (dispatch) {
    dispatch(requestSectionsSearch());
    return fetch(`/data/sections/${schoolId}/${subjectAbbv}/${courseAbbv}`)
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

export function fetchDetails(schoolId, subjectAbbv, courseAbbv, sectionId) {
  return function (dispatch) {
    dispatch(requestDetails());
    return fetch(`/data/details/${schoolId}/${subjectAbbv}/${courseAbbv}/${sectionId}`)
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

export function fetchDetailsSearch(schoolId, subjectAbbv, courseAbbv, sectionId) {
  return function (dispatch) {
    dispatch(requestDetailsSearch());
    return fetch(`/data/details/${schoolId}/${subjectAbbv}/${courseAbbv}/${sectionId}`)
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

export function fetchDetailsCart(schoolId, subjectAbbv, courseAbbv, sectionId) {
  return function (dispatch) {
    dispatch(requestDetailsCart());
    return fetch(`/data/details/${schoolId}/${subjectAbbv}/${courseAbbv}/${sectionId}`)
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

export function fetchSearchData() {
  return function (dispatch) {
    dispatch(requestSearchData());
    return fetch('/data/search')
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
