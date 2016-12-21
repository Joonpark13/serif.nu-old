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

const mapStateToProps = (state) => ({
  isFetching: state.cart.data.details.isFetching,
  selected: state.cart.selected,
  sections: state.calendar.sections,
  components: state.calendar.components,
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
