import { connect } from 'react-redux';
import { List } from 'immutable';

import {
  changeTerm,
  firstCalendar,
  addCalendar,
  changeCalendar,
  removeCalendar
} from '../action-creators';
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

const checkIfOnlyCalendar = (sections, currentTerm) => {
    const term = sections.find(termObj => termObj.get('id') === currentTerm);
    if (term) return term.get('items').toJS().length === 1;
    return true;
};

const mapStateToProps = (state) => {
  const sections = state.calendar.get('sections');
  const currentTerm = state.terms.currentTerm;
  return {
    terms: state.terms.terms.items.sort(compareTermId),
    currentTerm: state.terms.currentTerm,
    calendars: findCalendar(sections, currentTerm).toJS(),
    currentCalendar: state.calendar.get('currentCalendar'),
    onlyCalendar: checkIfOnlyCalendar(sections, currentTerm)
  };
};

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
  },
  removeCalendar: () => {
    dispatch(removeCalendar());
  }
});

const TermSelectContainer = connect(mapStateToProps, mapDispatchToProps)(TermSelect);
export default TermSelectContainer;
