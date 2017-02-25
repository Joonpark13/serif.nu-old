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
        You can expect course data to be updated regularly during registration
        season.
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
      <h3>Does Serif.nu work with CAESAR?</h3>
      <p>
        If you have the Regal chrome extension installed, yes! Serif.nu works together
        with Regal to provide the ultimate registration week experience. Design the
        schedule you want right here on Serif.nu, then send those courses straight
        to CAESAR at the click of a button. <Link to="/regal">Check out how it works
        here</Link>.
      </p>
    </div>

    <div style={style.question}>
      <h3>I clicked the Facebook share button and nothing happened. (or) I logged into Facebook but nothing happened.</h3>
      <p>
        In some cases, your browser will block a popup window from appearing.
        Either configure your browser to disable popup blocking, or be on the lookout
        for a "popup blocked" notification when you click the Facebook share button.
      </p>
      <p>
        If you were able to see the login popup window, but nothing happened after logging in
        and/or approving the app permissions, try closing the popup window and clicking
        Facebook share again. Unless you have already seen a confirmation at the bottom
        of your window saying "Photo posted to Facebook", you will not be making duplicate
        posts. However, once you do see this notification, you can rest assured the photo
        has been posted to Facebook!
      </p>
    </div>

    <div style={style.question}>
      <h3>I found a bug. What should I do?</h3>
      <p>
        Please report it <Link to="/bug">using this form</Link>.
      </p>
    </div>

    <div style={style.question}>
      <h3>I'd like to adapt Serif.nu for scheduling courses at another university. How can I do that?</h3>
      <p>
        Please <Link to="/contact">contact us through email</Link> - we'd be happy to help.
      </p>
    </div>

    <div style={style.question}>
      <h3>Is there a mobile version?</h3>
      <p>
        Currently, Serif.nu is best viewed on a laptop or desktop screen. However, enhancements for mobile
        screens are in the works!
      </p>
    </div>
  </div>
);

export default FAQ;
