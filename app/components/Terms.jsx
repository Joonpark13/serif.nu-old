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
        <h3>Errata</h3>
        <p>
          The materials appearing on CoursePad.me's web site could include technical, typographical, or
          photographic errors. CoursePad.me does not warrant that any of the materials on its web site are
          accurate, complete, or current. CoursePad.me may make changes to the materials contained on its
          web site at any time without notice.
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
        <h3>Links</h3>
        <p>
          CoursePad.me has not reviewed all of the sites linked to its Internet web site
          and is not responsible for the contents of any such linked site. The inclusion
          of any link does not imply endorsement by CoursePad.me of the site. Use of any
          such linked web site is at the user's own risk.
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

    <h1 style={style.title}>Privacy Policy</h1>

    <Divider />

    <p style={{ paddingTop: '10px' }}>
      Your privacy is very important to us. Accordingly, we have developed this Policy in order
      for you to understand how we collect, use, communicate and disclose and make use of
      personal information. The following outlines our privacy policy.
    </p>

    <ul>
      <li>
        We will collect and use of personal information solely with the objective of bettering
        the user's experience or for other compatible purposes.
      </li>
      <li>
        We will only retain personal information as long as necessary for the fulfillment of
        those purposes.
      </li>
      <li>
        We will collect personal information by lawful and fair means and, where appropriate,
        with the knowledge or consent of the individual concerned.
      </li>
      <li>
        We will attempt to protect personal information by reasonable security safeguards
        against loss or theft, as well as unauthorized access, disclosure, copying, use or
        modification.
      </li>
      <li>
        We will make readily available to users information about our policies and
        practices relating to the management of personal information.
      </li>
      <li>
        We may use analytics software, including but not limited to, Google Analytics, etc.
        Such data collected will be used solely for the purpose of improving the user
        experience.
      </li>
      <li>
        We use local storage technologies, including Cookies, localStorage, etc. to enhance
        your experience.
      </li>
    </ul>
  </div>
);

export default Terms;
