import React from 'react';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';

import { northwesternPurple } from '../colors';

const style = {
  background: {
    padding: '50px'
  },
  title: {
    color: northwesternPurple
  },
  question: {
    marginTop: '40px'
  }
};

const FAQ = () => (
  <div style={style.background}>
    <h1 style={style.title}>Frequently Asked Questions</h1>

    <Divider />

    <div style={style.question}>
      <h3>What is Serif.nu?</h3>
      <p>
        <Link to="/about">We're glad you asked...</Link>
      </p>
    </div>

    <div style={style.question}>
      <h3>Is the site still maintained? Can I expect updates?</h3>
      <p>
        Yes, and yes! Serif.nu is actively being updated to include
        new features to better serve the Northwestern student experience.
      </p>
    </div>

    <div style={style.question}>
      <h3>I'm a developer. I'd like to contribute.</h3>
      <p>
        Wonderful! <Link to="/contact">Send us a message</Link> and
        <a href="https://github.com/Joonpark13/serif.nu"> check out our repository.</a>
      </p>
    </div>

    <div style={style.question}>
      <h3>I found a bug. What should I do?</h3>
      <p>
        Please report it <Link to="/bug">using this form</Link>.
      </p>
    </div>
  </div>
);

export default FAQ;
