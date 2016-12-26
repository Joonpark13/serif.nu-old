import { connect } from 'react-redux';

import { changeTerm, firstCalendar } from '../action-creators';
import TermSelect from '../components/TermSelect.jsx';

const compareTermId = (termA, termB) => (
  // parseInt second param: base 10
  parseInt(termB.id, 10) - parseInt(termA.id, 10)
);

const mapStateToProps = (state) => ({
  terms: state.terms.terms.items.sort(compareTermId),
  currentTerm: state.terms.currentTerm,
  calendars: [{ id: 1, name: 'Cal 1' }, { id: 2, name: 'cal 2' }],
  currentCalendar: 1
});

const mapDispatchToProps = (dispatch) => ({
  changeTerm: (termId) => {
    dispatch(changeTerm(termId));
    dispatch(firstCalendar());
  },
  changeCalendar: (calId) => {
  }
});

const TermSelectContainer = connect(mapStateToProps, mapDispatchToProps)(TermSelect);
export default TermSelectContainer;
