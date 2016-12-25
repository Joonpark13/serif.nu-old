import { connect } from 'react-redux';

import changeTerm from '../action-creators';
import TermSelect from '../components/TermSelect.jsx';

const mapStateToProps = (state) => ({
  terms: state.terms.terms.items,
  currentTerm: state.terms.currentTerm
});

const mapDispatchToProps = (dispatch) => ({
  changeTerm: (termId) => {
    dispatch(changeTerm(termId));
  }
});

const TermSelectContainer = connect(mapStateToProps, mapDispatchToProps)(TermSelect);
export default TermSelectContainer;
