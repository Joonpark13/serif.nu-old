import { connect } from 'react-redux';

import { fetchSubjects, fetchCourses, fetchSections, showSubjects, showCourses, showSections } from '../action-creators';
import Browse from '../components/Browse.jsx';

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  selected: state.selected,
  schools: state.data.schools.items,
  subjects: state.data.subjects.items,
  courses: state.data.courses.items,
  sections: state.data.sections.items
});

const mapDispatchToProps = (dispatch) => ({
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
  }
});

const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

export default BrowseContainer;
