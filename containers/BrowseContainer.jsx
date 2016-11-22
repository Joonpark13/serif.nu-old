import { connect } from 'react-redux';

import { showSubjects, showCourses } from '../action-creators';
import Browse from '../components/Browse.jsx';

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  schools: state.schools,
  subjects: state.subjects
});

const mapDispatchToProps = (dispatch) => ({
  showSubjects: (schoolId) => {
    dispatch(showSubjects(schoolId));
  },
  showCourses: (subjectId) => {
    dispatch(showCourses(subjectId));
  }
});

const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

export default BrowseContainer;
