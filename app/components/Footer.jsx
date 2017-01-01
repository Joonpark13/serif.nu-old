import React from 'react';
import { IndexLink, Link } from 'react-router';

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
  },
  anchorColor: {
    color: richBlack10
  }
};

const Footer = () => (
  <div style={style.background}>
    <div style={style.panel}>
      <h1 style={{ marginTop: 0 }}>Serif.nu</h1>
      <p>&copy; 2017 <a style={style.anchorColor} href="http://joonparkmusic.com/">Joon Park</a></p>
      <p>Serif.nu is neither created nor endorsed by Northwestern University.</p>
      <Link to="/tos"><p style={style.anchorColor}>Terms of Service and Privacy Policy</p></Link>
    </div>
    <div style={style.panel}>
      <a href="https://www.facebook.com/nuserif/"><img src={facebook} alt="Facebook" style={style.icon} /></a>
      <a href="https://github.com/Joonpark13/serif.nu"><img src={github} alt="Github" style={style.icon} /></a>
    </div>
    <div style={style.panel}>
      <IndexLink to="/"><p style={style.anchorColor}>Serif.nu</p></IndexLink>
      <Link to="/about"><p style={style.anchorColor}>About</p></Link>
      <Link to="/faq"><p style={style.anchorColor}>FAQ</p></Link>
      <Link to="/bug"><p style={style.anchorColor}>Report a Bug</p></Link>
      <Link to="/contact"><p style={style.anchorColor}>Contact</p></Link>
    </div>
  </div>
);

export default Footer;
