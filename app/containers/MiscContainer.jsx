import { connect } from 'react-redux';

import {
  addEvent
} from '../action-creators';
import { findData } from '../helpers';
import Misc from '../components/Misc.jsx';

const mapStateToProps = (state) => ({
  classMaterials: findData(
    state.calendar.get('sections'),
    state.terms.currentTerm,
    state.calendar.get('currentCalendar')
  ).map(section => {
    const materials = section.get('descriptions').find(desc => desc.get('name') === 'Class Materials (Required)');
    return {
      name: `${section.get('subject')} ${section.get('course')} ${section.get('name')}`,
      materials: materials ? materials.get('value') : undefined
    };
  })
});

const mapDispatchToProps = (dispatch) => ({
  addEvent: (customEvent) => {
    dispatch(addEvent(customEvent));
  }
});

const MiscContainer = connect(mapStateToProps, mapDispatchToProps)(Misc);

export default MiscContainer;
