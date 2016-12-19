import { connect } from 'react-redux';

import Cart from '../components/Cart.jsx';

const mapStateToProps = (state) => ({
  sections: state.calendar.sections,
  components: state.calendar.components
});

const CartContainer = connect(mapStateToProps)(Cart);

export default CartContainer;
