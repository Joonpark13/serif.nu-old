import { connect } from 'react-redux';
import { List } from 'immutable';

import { changeTerm, firstCalendar, addCalendar, changeCalendar } from '../action-creators';
import TermSelect from '../components/TermSelect.jsx';

const compareTermId = (termA, termB) => (
  // parseInt second param: base 10
  parseInt(termB.id, 10) - parseInt(termA.id, 10)
);

const findCalendar = (sections, currentTerm) => {
  let items = List([]);
  sections.map(term => {
    if (term.get('id') === currentTerm) items = term.get('items');
  });
  return items;
};

const mapStateToProps = (state) => ({
  terms: state.terms.terms.items.sort(compareTermId),
  currentTerm: state.terms.currentTerm,
  calendars: findCalendar(state.calendar.get('sections'), state.terms.currentTerm).toJS(),
  currentCalendar: state.calendar.get('currentCalendar')
});

const mapDispatchToProps = (dispatch) => ({
  changeTerm: (termId) => {
    dispatch(changeTerm(termId));
    dispatch(firstCalendar());
  },
  addCalendar: () => {
    dispatch(addCalendar());
  },
  changeCalendar: (calId) => {
    dispatch(changeCalendar(calId));
  }
});

const TermSelectContainer = connect(mapStateToProps, mapDispatchToProps)(TermSelect);
export default TermSelectContainer;
