import { connect } from 'react-redux';

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

const mapStateToProps = (state) => ({
  currentTerm: state.terms.currentTerm,
  isFetching: state.cart.data.details.isFetching,
  selected: state.cart.selected,
  sections: findData(
    state.calendar.get('sections'),
    state.terms.currentTerm,
    state.calendar.get('currentCalendar')
  ),
  components: findData(
    state.calendar.get('components'),
    state.terms.currentTerm,
    state.calendar.get('currentCalendar')
  ),
  details: state.cart.data.details.info,
  swapping: state.cart.swapping
});

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
