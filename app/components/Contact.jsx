import React from 'react';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

import { northwesternPurple } from '../colors';

const style = {
  background: {
    padding: '50px'
  },
  title: {
    color: northwesternPurple
  },
  contact: {
    marginTop: '40px'
  },
  italic: {
    fontStyle: 'italic'
  }
};

const Contact = () => (
  <div style={style.background}>
    <h1 style={style.title}>Contact</h1>

    <Divider />

    <h3>
      To report a bug, please use <Link to="/bug">the bug report form</Link>.
      For all other inquiries, please email <span style={style.italic}>serifnorthwestern </span>
      at <span style={style.italic}>gmail.com</span>. Don't forget to <a href="https://www.facebook.com/nuserif/">like us on Facebook!</a>
    </h3>
  </div>
);

export default Contact;
