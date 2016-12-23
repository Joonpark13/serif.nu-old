import React from 'react';

import { northwesternPurple } from '../colors';

const style = {
  background: {
    padding: '50px'
  },
  title: {
    color: northwesternPurple,
    marginBottom: '30px'
  }
};

const ReportBug = () => (
  <div style={style.background}>
    <h1 style={style.title}>Report a Bug</h1>
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScaXXO7ySVcBk1g0FGdMQqLii0eFaNkh6sOzrTB9KmDe5XmTA/viewform?embedded=true" width="100%" height="1100" frameBorder="0" marginHeight="0" marginWidth="0">Loading...</iframe>
  </div>
);

export default ReportBug;
