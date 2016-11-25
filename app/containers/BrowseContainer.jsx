import { connect } from 'react-redux';

import { fetchSubjects, showSubjects, showCourses } from '../action-creators';
import Browse from '../components/Browse.jsx';

const mapStateToProps = (state) => ({
  currentView: state.currentView,
  schools: state.data.schools.items,
  subjects: state.data.subjects.items
});

const mapDispatchToProps = (dispatch) => ({
  showSubjects: (schoolId) => {
    dispatch(fetchSubjects(schoolId));
    dispatch(showSubjects(schoolId));
  },
  showCourses: (subjectId) => {
    dispatch(showCourses(subjectId));
  }
});

const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

export default BrowseContainer;
