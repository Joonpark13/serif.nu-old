import React from 'react';
import Divider from 'material-ui/Divider';

import { northwesternPurple } from '../colors';

const style = {
  background: {
    padding: '50px'
  },
  title: {
    color: northwesternPurple
  }
};

const Terms = () => (
  <div style={style.background}>
    <h1 style={style.title}>Terms of Service</h1>

    <Divider />

    <ol>
      <li>
        <h3>Terms</h3>
        <p>
          By accessing this web site, you are agreeing to be bound by these web site Terms of Service,
          all applicable laws and regulations, and agree that you are responsible for compliance with
          any applicable local laws. If you do not agree with any of these terms, you are prohibited
          from using or accessing this web site. The materials contained in this web site are protected
          by applicable copyright and trade mark law.
        </p>
      </li>
      <li>
        <h3>Disclaimer</h3>
        <p>
          The materials on Serif.nu are provided "as is." Serif.nu makes no warranties, expressed or implied,
          and hereby disclaims and negates all other warranties, including without limiation, implied
          warranties or conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of rights. Further, Serif.nu does
          not warrant or make any representations concerning the accuracy, likely results, or
          reliablility of the use of the materials on the web site or otherwise relating to such
          materials or on any web sites linked to this web site.
        </p>
      </li>
      <li>
        <h3>Limitations</h3>
        <p>
          In no ever shall Serif.nu or its creators be liable for any damages (including, without
          limitation, damanges for loss of data or profit, or due to business interruption)
          arising out of the use or inability to use the materials on Serif.nu, even if Serif.nu
          or Serif.nu's creators have been notified orally or in writing of the possibility of
          such damage.
        </p>
      </li>
      <li>
        <h3>Terms of Service Modifications</h3>
        <p>
          Serif.nu may revise these Terms of Service at any time without notice. By using this
          web site you are agreeing to be bound by the current version of the Terms of Service
          at the time.
        </p>
      </li>
      <li>
        <h3>Governing Law</h3>
        <p>
          Any claim relating to Serif.nu shall be governed by the laws of the State of Illinois
          without regard to its conflict of law provisions.
        </p>
      </li>
    </ol>
  </div>
);

export default Terms;
