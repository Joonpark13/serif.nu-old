import { connect } from 'react-redux';

import {
  addEvent
} from '../action-creators';
import Misc from '../components/Misc.jsx';

const mapStateToProps = (state) => {
  return ({
  });
};

const mapDispatchToProps = (dispatch) => ({
  addEvent: (customEvent) => {
    dispatch(addEvent(customEvent));
  }
});

const MiscContainer = connect(mapStateToProps, mapDispatchToProps)(Misc);

export default MiscContainer;
