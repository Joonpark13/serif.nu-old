import React from 'react';
import Divider from 'material-ui/Divider';

import { northwesternPurple } from '../colors';

const style = {
  background: {
    padding: '50px'
  },
  title: {
    color: northwesternPurple,
    marginBottom: '30px'
  },
  italic: {
    fontStyle: 'italic'
  },
  note: {
    marginBottom: '30px'
  }
};

const ReportBug = () => (
  <div style={style.background}>
    <h1 style={style.title}>Report a Bug</h1>
    <Divider />
    <h3 style={style.note}>
      NOTE: For all questions regarding course data (Ex. "When will
      winter 2018 courses be updated?"), please <a href="https://www.facebook.com/nuserif/">follow Serif.nu on Facebook for
      updates</a>.
    </h3>
    <h3 style={style.note}>
      NOTE: In all cases where a specific course's information differs
      from what is shown on CAESAR, this indicates a problem with the
      registrar's data. Since Serif.nu directly displays the data provided
      by the registrar, we have no control over any discrepancies that may
      occur.
    </h3>
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScaXXO7ySVcBk1g0FGdMQqLii0eFaNkh6sOzrTB9KmDe5XmTA/viewform?embedded=true" width="100%" height="1100" frameBorder="0" marginHeight="0" marginWidth="0">Loading...</iframe>
  </div>
);

export default ReportBug;
