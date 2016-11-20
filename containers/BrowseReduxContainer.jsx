import { connect } from 'react-redux';
import Browse from '../components/Browse.jsx';

function getView(state) {
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
    data: getView(state)
});

const BrowseReduxContainer = connect(mapStateToProps)(Browse);

export default BrowseReduxContainer;
