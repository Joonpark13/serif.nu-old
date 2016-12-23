import React from 'react';

import heroImage from '../images/Cover1.jpg';

const style = {
  hero: {
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '600px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
};

const About = () => (
  <div>
    <div style={style.hero}></div>
    <div style={{ height: '600px' }}>
      Simple. Fast. Visual. Course planning for Northwestern University.
    </div>
    <div style={{ backgroundColor: 'red', height: '1500px' }}></div>
  </div>
);

export default About;
