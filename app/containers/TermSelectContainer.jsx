import { connect } from 'react-redux';

import { changeTerm, firstCalendar } from '../action-creators';
import TermSelect from '../components/TermSelect.jsx';

const compareTermId = (termA, termB) => (
  // parseInt second param: base 10
  parseInt(termB.id, 10) - parseInt(termA.id, 10)
);

const findCalendar = (sections, currentTerm) => {
  let items = [];
  sections.forEach((term) => {
    if (term.id === currentTerm) items = term.items;
  });
  return items;
};

const mapStateToProps = (state) => ({
  terms: state.terms.terms.items.sort(compareTermId),
  currentTerm: state.terms.currentTerm,
  calendars: findCalendar(state.calendar.sections, state.terms.currentTerm),
  currentCalendar: state.calendar.currentCalendar
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
