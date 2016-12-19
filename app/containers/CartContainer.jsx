import { connect } from 'react-redux';

import { remove } from '../action-creators';
import Cart from '../components/Cart.jsx';

const mapStateToProps = (state) => ({
  sections: state.calendar.sections,
  components: state.calendar.components
});

const mapDispatchToProps = (dispatch) => ({
  remove: (sectionId) => {
    dispatch(remove(sectionId));
  }
});

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
