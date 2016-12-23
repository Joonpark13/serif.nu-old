import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import heroImage from '../images/Cover1.jpg';
import { northwesternPurple, northwesternPurple10 } from '../colors';
import studentImage from '../images/Surprised.svg';
import screenshot1 from '../images/Screenshot1.png';
import screenshot2 from '../images/Screenshot2.gif';
import screenshot3 from '../images/Screenshot3.gif';
import browse from '../images/Browse.png';
import search from '../images/Search.png';

const style = {
  hero: {
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '600px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  heroText: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '600px',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingTop: '280px'
  },
  heroTitle: {
    fontSize: '50px'
  },
  sectionOdd: {
    padding: '50px'
  },
  sectionEven: {
    padding: '50px',
    backgroundColor: northwesternPurple10
  },
  purpleHeader: {
    color: northwesternPurple,
    marginBottom: '50px'
  },
  centeredPurpleHeader: {
    color: northwesternPurple,
    marginBottom: '50px',
    textAlign: 'center'
  },
  divideTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  studentImage: {
    width: '400px'
  },
  screenshot: {
    width: '600px'
  },
  screenshot2: {
    width: '700px'
  },
  blurbs: {
    marginLeft: '50px',
    marginRight: '50px',
    marginBottom: '50px'
  },
  compare: {
    width: '300px'
  },
  compareItem: {
    textAlign: 'center',
    marginTop: '30px'
  },
  compareTitle: {
    marginTop: '20px',
    marginBottom: '20px'
  }
};

const About = () => (
  <div>
    <div style={style.hero}></div>
    <div style={style.heroText}>
      <h1 style={style.heroTitle}>Simple. Fast. Visual.</h1>
      <h2>Course planning for Northwestern University.</h2>
    </div>

    <div style={style.sectionOdd}>
      <h1 style={style.purpleHeader}>We get it. It's almost registration.</h1>
      <div style={style.divideTwo}>
        <img src={studentImage} alt="Student with a laptop" style={style.studentImage} />
        <div style={style.blurbs}>
          <h3>No more drawing out your schedules on paper.</h3>
          <h3>No more clunky excel spreadsheets.</h3>
          <h3>Plan out next quarter's schedule the way it always should have been.</h3>
        </div>
      </div>
    </div>

    <div style={style.sectionEven}>
      <h1 style={style.centeredPurpleHeader}>
        Serif.nu is <span style={{ fontStyle: 'italic' }}>Simple</span>.
      </h1>
      <div style={style.divideTwo}>
        <div style={style.blurbs}>
          <h3>Everything you need to visualize your schedule,</h3>
          <h3>on one page.</h3>
        </div>
        <img src={screenshot1} alt="Serif screenshot" style={style.screenshot} />
      </div>
    </div>

    <div style={style.sectionOdd}>
      <h1 style={style.centeredPurpleHeader}>
        Serif.nu is <span style={{ fontStyle: 'italic' }}>Fast</span>.
      </h1>
      <div style={style.divideTwo}>
        <img src={screenshot2} alt="Serif screenshot" style={style.screenshot2} />
        <div style={style.blurbs}>
          <h3>Browse? Search? Edit?</h3>
          <h3>All of it only a click away.</h3>
        </div>
      </div>
    </div>

    <div style={style.sectionEven}>
      <h1 style={style.centeredPurpleHeader}>
        Serif.nu is <span style={{ fontStyle: 'italic' }}>Visual</span>.
      </h1>
      <div style={style.divideTwo}>
        <div style={style.blurbs}>
          <h3>We know CAESAR's shopping cart isn't very conducive to laying out the week.</h3>
          <h3>Visualize your time from start to finish of your planning process.</h3>
        </div>
        <img src={screenshot3} alt="Serif screenshot" style={style.screenshot2} />
      </div>
    </div>

    <div>
      <div style={style.divideTwo}>
        <div style={style.compareItem}>
          <h2 style={style.compareTitle}>Search</h2>
          <img src={search} alt="Serif search" style={style.compare} />
        </div>
        <div style={style.compareItem}>
          <h2 style={style.compareTitle}>Browse</h2>
          <img src={browse} alt="Serif browse" style={style.compare} />
        </div>
      </div>
      <div style={style.compareItem}>
        <h2 style={style.purpleHeader}>Have it your way.</h2>
      </div>
    </div>

    <div style={style.sectionEven}>
      <div style={style.divideTwo}> {/* Can be used to divide into more than two sections */}
        <div style={style.compareItem}>
          <h2 style={style.centeredPurpleHeader}>
            Questions?
          </h2>
          <RaisedButton label="FAQ" primary />
        </div>
        <div style={style.compareItem}>
          <h2 style={style.centeredPurpleHeader}>
            Found a bug?
          </h2>
          <RaisedButton label="Report a bug" primary />
        </div>
        <div style={style.compareItem}>
          <h2 style={style.centeredPurpleHeader}>
            Reach out to us.
          </h2>
          <RaisedButton label="Contact" primary />
        </div>
      </div>
    </div>
  </div>
);

export default About;
