import { connect } from 'react-redux';
import React from 'react';

import {
  addEvent
} from '../action-creators';
import { findData } from '../helpers';
import Misc from '../components/Misc.jsx';

const parseMaterials = (data) => data.map(section => {
  let required = section.get('descriptions').find(desc => desc.get('name') === 'Class Materials (Required)');
  let suggested = section.get('descriptions').find(desc => desc.get('name') === 'Class Materials (Suggested)');
  if (required) {
    required = required.get('value').split('<br/>');
    required = required.map((material, index) => <span key={index}>{material}<br /></span>);
  }
  if (suggested) {
    suggested = suggested.get('value').split('<br/>');
    suggested = suggested.map((material, index) => <span key={index}>{material}<br /></span>);
  }
  return {
    name: `${section.get('subject')} ${section.get('course')} ${section.get('name')}`,
    required,
    suggested
  };
});

const mapStateToProps = (state) => ({
  classMaterials: parseMaterials(findData(
    state.calendar.get('sections'),
    state.terms.currentTerm,
    state.calendar.get('currentCalendar')
  ))
});

const mapDispatchToProps = (dispatch) => ({
  addEvent: (customEvent) => {
    dispatch(addEvent(customEvent));
  }
});

const MiscContainer = connect(mapStateToProps, mapDispatchToProps)(Misc);

export default MiscContainer;
