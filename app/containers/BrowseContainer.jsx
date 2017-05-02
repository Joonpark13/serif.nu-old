import { connect } from 'react-redux';

import {
  fetchSubjects,
  fetchCourses,
  fetchSections,
  showSchools,
  showSubjects,
  showCourses,
  showSections,
  addCourse,
  addComponent,
  addCourseHover,
  addComponentHover,
  removeHover,
  showComponentsBrowse
} from '../action-creators';
import { findData } from '../helpers';
import Browse from '../components/Browse.jsx';

const mapStateToProps = (state) => ({
  currentTerm: state.terms.currentTerm,
  currentCalendar: state.calendar.get('currentCalendar'),
  currentView: state.browse.currentView,
  selected: state.browse.selected,
  isFetching: state.browse.data.schools.isFetching ||
    state.browse.data.subjects.isFetching ||
    state.browse.data.courses.isFetching ||
    state.browse.data.sections.isFetching,
  schools: state.browse.data.schools.items,
  subjects: state.browse.data.subjects.items,
  courses: state.browse.data.courses.items,
  sections: state.browse.data.sections.items,
  calendar: state.calendar
});

const mapDispatchToProps = (dispatch) => ({
  showSchools: () => {
    dispatch(showSchools());
  },
  showSubjects: (currentTerm, schoolId) => {
    dispatch(fetchSubjects(currentTerm, schoolId));
    dispatch(showSubjects(schoolId));
  },
  showCourses: (currentTerm, schoolId, subjectAbbv) => {
    dispatch(fetchCourses(currentTerm, schoolId, subjectAbbv));
    dispatch(showCourses(subjectAbbv));
  },
  showSections: (currentTerm, schoolId, subjectAbbv, courseAbbv) => {
    dispatch(fetchSections(currentTerm, schoolId, subjectAbbv, courseAbbv));
    dispatch(showSections(courseAbbv));
  },
  checkComponents: (subjectAbbv, associatedClasses) => {
    if (associatedClasses) dispatch(showComponentsBrowse());
    else dispatch(showCourses(subjectAbbv));
  },
  addCourse: (section) => {
    dispatch(addCourse(section));
  },
  addComponent: (detail) => {
    dispatch(addComponent(detail));
  },
  addCourseHover: (section) => {
    dispatch(addCourseHover(section));
  },
  addComponentHover: (detail) => {
    dispatch(addComponentHover(detail));
  },
  removeHover: () => {
    dispatch(removeHover());
  }
});

const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

export default BrowseContainer;
