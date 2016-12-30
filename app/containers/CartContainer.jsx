import { connect } from 'react-redux';
import $ from 'jquery';

import {
  remove,
  swapComponent,
  addComponentCart,
  fetchDetailsCart,
  addComponentHover,
  removeHover
} from '../action-creators';
import Cart from '../components/Cart.jsx';
import { findData } from '../helpers';

const calculateHours = () => {
  const events = $('#calendar').fullCalendar('clientEvents');
  let sum = 0;
  if (Array.isArray(events)) { // events can be a jQuery object on load
    events.forEach(event => {
      let diff = event.end.diff(event.start, 'minutes');
      // If difference in minutes is not a multiple of 30, add 10
      if (diff % 30 !== 0) diff += 10;
      sum += diff;
    });
  }
  return sum / 60;
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
    hours: calculateHours()
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
  }
});

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
