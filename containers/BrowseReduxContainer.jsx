import { connect } from 'react-redux';
import { showSubjects } from '../actions/actions';
import Browse from '../components/Browse.jsx';

function propsFilter(state) {
  switch (state.currentView) {
    case 'schools':
      return state.schools;
    case 'subjects':
      return state.subjects;
    default:
      throw new Error(`No such view: ${state.currentView}`);
  }
}

const mapStateToProps = (state) => ({
  schools: propsFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  showSubjects: (schoolId) => {
    dispatch(showSubjects(schoolId));
  }
});

const BrowseReduxContainer = connect(mapStateToProps, mapDispatchToProps)(Browse);

export default BrowseReduxContainer;
