import React from 'react';

import regalLogo from '../images/wreath.png';
import serifLogo from '../images/SerifLogo.png';
import { northwesternPurple } from '../colors';
import sendToCAESAR from '../images/SendToCAESAR.png';
import regalConfirm from '../images/RegalConfirm.png';
import caesarShoppingCart from '../images/CAESARShoppingCart.png';

const style = {
  section: {
    padding: '50px'
  },
  instructions: {
    width: '1000px',
    margin: 'auto',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '50px'
  },
  centeredPurpleHeader: {
    color: northwesternPurple,
    marginBottom: '10px',
    textAlign: 'center'
  },
  logos: {
    width: '600px', // logo width * 2
    margin: 'auto'
  },
  logo: {
    padding: '50px',
    width: '300px'
  },
  screenshots: {
    width: '700px',
    display: 'block',
    margin: 'auto'
  },
  li: {
    padding: '10px'
  },
  bodyText: {
    fontSize: '1.5em',
    paddingTop: '10px',
    paddingBottom: '10px'
  }
};

const Regal = () => (
  <div>
    <div style={style.section}>
      <div style={style.logos}>
        <img style={style.logo} src={serifLogo} alt="Serif Logo" />
        <img style={style.logo} src={regalLogo} alt="Regal Logo" />
      </div>

      <h1 style={style.centeredPurpleHeader}>Serif.nu and Regal.</h1>
      <h1 style={style.centeredPurpleHeader}>
        The ultimate Northwestern course registration experience.
      </h1>
    </div>

    <div style={style.instructions}>
      <h2>Wish you could add your Serif.nu schedule straight to CAESAR?</h2>
      <h2>Now you can.</h2>
      <p style={style.bodyText}>
        Regal is a Chrome extension designed to make your CAESAR experience a bit less
        painful. Now, with Regal installed, you can send your courses from Serif.nu
        straight to CAESAR when you're ready to register.
      </p>
      <h2>Using Serif.nu with Regal:</h2>
      <ol style={style.bodyText}>
        <li style={style.li}>
          <a href="http://bit.ly/regalnu">Install Regal.</a>
        </li>
        <li style={style.li}>
          <p>
            Create a schedule on Serif.nu like you normally would. When you're ready to
            register, click the SEND TO CAESAR button.
          </p>
          <img style={style.screenshots} src={sendToCAESAR} alt={"Send to CAESAR"} />
        </li>
        <li style={style.li}>
          <p>On the popup dialog, click ADD.</p>
          <img style={style.screenshots} src={regalConfirm} alt={"Regal Popup Dialog"} />
        </li>
        <li style={style.li}>
          <p>
            Your shopping cart on CAESAR should now show a Serif cart with the courses
            you have selected!
          </p>
          <img style={style.screenshots} src={caesarShoppingCart} alt={"Serif Cart in CAESAR"} />
        </li>
        <li style={style.li}>
          <p>
            Click the plus sign to add the course to your CAESAR shopping cart. Happy
            registration!
          </p>
        </li>
      </ol>
    </div>
  </div>
);

export default Regal;
