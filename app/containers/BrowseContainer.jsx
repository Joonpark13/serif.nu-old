import { connect } from 'react-redux';

import {
  fetchSubjects,
  fetchCourses,
  fetchSections,
  fetchDetails,
  showSchools,
  showSubjects,
  showCourses,
  showSections,
  addCourse,
  addComponent
} from '../action-creators';
import Browse from '../components/Browse.jsx';

const mapStateToProps = (state) => (
  {
    currentView: state.browse.currentView,
    selected: state.browse.selected,
    isFetching: state.browse.data.schools.isFetching ||
      state.browse.data.subjects.isFetching ||
      state.browse.data.courses.isFetching ||
      state.browse.data.sections.isFeting ||
      state.browse.data.details.isFetching,
    schools: state.browse.data.schools.items,
    subjects: state.browse.data.subjects.items,
    courses: state.browse.data.courses.items,
    sections: state.browse.data.sections.items,
    details: state.browse.data.details.info,
    calendar: state.calendar
  }
);

const mapDispatchToProps = (dispatch) => ({
  showSchools: () => {
    dispatch(showSchools());
  },
  showSubjects: (schoolId) => {
    dispatch(fetchSubjects(schoolId));
    dispatch(showSubjects(schoolId));
  },
  showCourses: (schoolId, subjectAbbv) => {
    dispatch(fetchCourses(schoolId, subjectAbbv));
    dispatch(showCourses(subjectAbbv));
  },
  showSections: (schoolId, subjectAbbv, courseAbbv) => {
    dispatch(fetchSections(schoolId, subjectAbbv, courseAbbv));
    dispatch(showSections(courseAbbv));
  },
  checkComponents: (schoolId, subjectAbbv, courseAbbv, sectionId) => {
    dispatch(fetchDetails(schoolId, subjectAbbv, courseAbbv, sectionId));
  },
  addCourse: (section) => {
    dispatch(addCourse(section));
  },
  addComponent: (detail) => {
    dispatch(addComponent(detail));
  }
});

const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

export default BrowseContainer;
