import React from 'react';
import Divider from 'material-ui/Divider';

import { northwesternPurple } from '../colors';

const style = {
  background: {
    padding: '50px'
  },
  title: {
    color: northwesternPurple
  },
  bodyText: {
    padding: '10px',
    fontSize: '1.25em'
  }
};

const Acknowledgements = () => (
  <div style={style.background}>
    <h1 style={style.title}>Acknowledgements</h1>

    <Divider />

    <div style={style.bodyText}>
      <p>
        Serif.nu would not exist without the support of many throughout the development process.
        We'd like to thank the following people for their numerous contributions.
      </p>
      <ul>
        <li>Istvan B.</li>
        <li>Simon B.</li>
        <li>Edan B.</li>
        <li>Michael G.</li>
        <li>Peter F.</li>
        <li>Ian T.</li>
      </ul>
      <p>
        We'd also like to thank the creator of Regal, William X. for his collaboration with Serif.nu.
      </p>
      <p>
        We'd like to thank the following people for their assistance in user testing.
      </p>
      <ul>
        <li>Tushar C.</li>
        <li>Scott B.</li>
        <li>Ryan R.</li>
        <li>Matt L.</li>
      </ul>
    </div>

  </div>
);

export default Acknowledgements;
