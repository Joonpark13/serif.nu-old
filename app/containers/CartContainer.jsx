import { connect } from 'react-redux';
import $ from 'jquery';

import {
  remove,
  swapComponent,
  addComponentCart,
  fetchDetailsCart,
  addComponentHover,
  removeHover,
  removeAll
} from '../action-creators';
import Cart from '../components/Cart.jsx';
import { findData } from '../helpers';

const calculateHours = (sections) => {
  let events = $('#calendar').fullCalendar('clientEvents');
  if (Array.isArray(events)) { // events can be a jQuery object on load
    const idList = sections.map(section => section.get('id'));
    events = events.filter(event => idList.includes(event.id));
    // events updates too slowly for values to be updated on prop change.
    // thus we must be sure we are only adding times for courses that are
    // still in the calendar.

    let sum = 0;
    events.forEach(event => {
      let diff = event.end.diff(event.start, 'minutes');
      // If difference in minutes is not a multiple of 30, add 10
      if (diff % 30 !== 0) diff += 10;
      sum += diff;
    });
    return sum / 60; // Hours
  }
  return 0;
};

const mapStateToProps = (state) => {
  const sections = findData(
    state.calendar.get('sections'),
    state.terms.currentTerm,
    state.calendar.get('currentCalendar')
  );
  const components = findData(
    state.calendar.get('components'),
    state.terms.currentTerm,
    state.calendar.get('currentCalendar')
  );
  return ({
    currentTerm: state.terms.currentTerm,
    isFetching: state.cart.data.details.isFetching,
    selected: state.cart.selected,
    sections,
    components,
    details: state.cart.data.details.info,
    swapping: state.cart.swapping,
    hours: calculateHours(sections)
  });
};

const mapDispatchToProps = (dispatch) => ({
  remove: (sectionId) => {
    dispatch(remove(sectionId));
  },
  swapComponent: (currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId) => {
    dispatch(fetchDetailsCart(currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId));
    dispatch(swapComponent(schoolId, subjectAbbv, courseAbbv, sectionId));
  },
  addComponent: (detail) => {
    dispatch(addComponentCart(detail));
  },
  addComponentHover: (detail) => {
    dispatch(addComponentHover(detail));
  },
  removeHover: (sectionId) => {
    dispatch(removeHover(sectionId));
  },
  removeAll: () => {
    dispatch(removeAll());
  }
});

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
