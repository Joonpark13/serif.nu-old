import { connect } from 'react-redux';

import { changeTerm } from '../action-creators';
import TermSelect from '../components/TermSelect.jsx';

const compareTermId = (termA, termB) => (
  // parseInt second param: base 10
  parseInt(termB.id, 10) - parseInt(termA.id, 10)
);

const mapStateToProps = (state) => ({
  terms: state.terms.terms.items.sort(compareTermId),
  currentTerm: state.terms.currentTerm
});

const mapDispatchToProps = (dispatch) => ({
  changeTerm: (termId) => {
    dispatch(changeTerm(termId));
  }
});

const TermSelectContainer = connect(mapStateToProps, mapDispatchToProps)(TermSelect);
export default TermSelectContainer;
