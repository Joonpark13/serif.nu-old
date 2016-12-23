import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Layout from './components/Layout.jsx';
import Serif from './components/Serif.jsx';
import About from './components/About.jsx';
import FAQ from './components/FAQ.jsx';
import ReportBug from './components/ReportBug.jsx';
import Contact from './components/Contact.jsx';
import Terms from './components/Terms.jsx';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Serif} />
    <Route path="/about" component={About} />
    <Route path="/faq" component={FAQ} />
    <Route path="/bug" component={ReportBug} />
    <Route path="/contact" component={Contact} />
    <Route path="/terms" component={Terms} />
  </Route>
);

const App = () => (
  <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
);

ReactDOM.render(<App />, document.getElementById('app'));
