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
import { findTermObjItems } from '../helpers';

const mapStateToProps = (state) => ({
  isFetching: state.cart.data.details.isFetching,
  selected: state.cart.selected,
  sections: findTermObjItems(state.calendar.sections, state.terms.currentTerm),
  components: findTermObjItems(state.calendar.components, state.terms.currentTerm),
  details: state.cart.data.details.info,
  swapping: state.cart.swapping
});

const mapDispatchToProps = (dispatch) => ({
  remove: (sectionId) => {
    dispatch(remove(sectionId));
  },
  swapComponent: (schoolId, subjectAbbv, courseAbbv, sectionId) => {
    dispatch(fetchDetailsCart(schoolId, subjectAbbv, courseAbbv, sectionId));
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
