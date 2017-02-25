import { connect } from 'react-redux';
import moment from 'moment';

import {
  remove,
  swapComponent,
  addComponentCart,
  addComponentHover,
  removeHover,
  removeAll
} from '../action-creators';
import Cart from '../components/Cart.jsx';
import { findData, parseSection, parseComponent } from '../helpers';

const calculateHours = (sections, components) => {
  const events = [];
  sections.forEach(section => {
      events.push(parseSection(section));
  });
  components.forEach(component => {
      events.push(parseComponent(component));
  });

  let sum = 0;
  events.forEach(event => {
    if (!event.unscheduled) {
      const start = moment(`2016-02-05 ${event.start}`); // Arbitrary date to allow moment to parse
      const end = moment(`2016-02-05 ${event.end}`);
      let diff = end.diff(start, 'minutes');
      // If difference in minutes is not a multiple of 30, add 10
      if (diff % 30 !== 0) diff += 10;
      sum += diff * event.dow.length; // Multiply by how many times the class meets per week
    }
  });
  return (sum / 60).toFixed(1); // Hours
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
    selected: state.cart.selected,
    sections,
    components,
    swapping: state.cart.swapping,
    hours: calculateHours(sections, components)
  });
};

const mapDispatchToProps = (dispatch) => ({
  remove: (sectionId) => {
    dispatch(remove(sectionId));
  },
  swapComponent: (currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId) => {
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
