import React from 'react';

import { northwesternPurple, richBlack10 } from '../colors';
import facebook from '../images/facebook.png';
import github from '../images/github-circle.png';

const style = {
  background: {
    backgroundColor: northwesternPurple,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  panel: {
    width: '300px',
    margin: '25px',
    color: richBlack10
  },
  icon: {
    marginRight: '10px'
  }
};

const Footer = () => (
  <div style={style.background}>
    <div style={style.panel}>
      <h1 style={{ marginTop: 0 }}>Serif.nu</h1>
      <p>&copy; 2017 <a style={{ color: richBlack10 }} href="http://joonparkmusic.com/">Joon Park</a></p>
      <p>Serif.nu has no official affiliation with Northwestern University.</p>
    </div>
    <div style={style.panel}>
      <a href="https://www.facebook.com/nuserif/"><img src={facebook} alt="Facebook" style={style.icon} /></a>
      <a href="https://github.com/Joonpark13/serif.nu"><img src={github} alt="Github" style={style.icon} /></a>
    </div>
    <div style={style.panel}>
      <p>Serif.nu</p>
      <p>About</p>
      <p>FAQ</p>
      <p>Report a bug</p>
      <p>Contact</p>
    </div>
  </div>
);

export default Footer;
