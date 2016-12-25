import React from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import TermSelectContainer from '../containers/TermSelectContainer.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import CalendarContainer from '../containers/CalendarContainer.jsx';
import BrowseContainer from '../containers/BrowseContainer.jsx';
import CartContainer from '../containers/CartContainer.jsx';
import { changeTab, onFirstVisit } from '../action-creators';

const style = {
  column: {
    paddingRight: 0,
    paddingLeft: 0
  },
  browse: {
    maxHeight: '675px',
    overflow: 'scroll',
    position: 'relative', // Necessary for z-index
    zIndex: 2
  },
  overlay: {
    backgroundColor: 'rgba(1, 1, 1, 0.4)',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1
  },
  search: {
    position: 'relative', // Necessary for z-index
    zIndex: 2
  },
  cart: {
    position: 'relative', // Necessary for z-index
    zIndex: 2
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  button: {
    display: 'inline-block'
  }
};

const mapStateToProps = (state) => ({
  selectingComponent: state.selectingComponent,
  tabState: state.tabState,
  firstVisit: state.firstVisit
});

const mapDispatchToProps = (dispatch) => ({
  handleTabChange: (value) => {
    dispatch(changeTab(value));
  },
  onFirstVisit: () => {
    dispatch(onFirstVisit());
  }
});

let Serif = ({ selectingComponent, tabState, handleTabChange, firstVisit, onFirstVisit }) => (
  <div>
    {/* Welcome Dialog */}
    <Dialog title="Welcome to the new Serif.nu!" modal open={firstVisit}>
      <p>
        Serif.nu is back in 2017 with an all new look governed by <a href="https://material.io/guidelines/">
        Material Design</a>. Find out more, or dive right in!
      </p>
      <div style={style.buttonBox}>
        <RaisedButton
          label="Let's go!"
          primary
          style={style.button}
          onTouchTap={() => onFirstVisit()}
        />
        <Link to="/about">
          <RaisedButton
            label="Tell me about Serif"
            primary
            style={style.button}
            onTouchTap={() => onFirstVisit()}
          />
        </Link>
      </div>
    </Dialog>

    <Grid fluid>
      <Row>
          {/* The order of the columns is switched:
            the first one is on the right and the second one is on the left.
            (push and pull boot strap column functionality) */}
        <Col style={style.column} md={3} mdPush={9}>
          <Card>
            <CardText>
              <TermSelectContainer />
            </CardText>
          </Card>

          <Tabs value={tabState} onChange={handleTabChange}>
            <Tab label="Search" value="search">
              <Card style={style.search}>
                <CardText>
                  <SearchContainer />
                </CardText>
              </Card>
            </Tab>

            <Tab label="Browse" value="browse">
              <Card style={style.browse}>
                <CardText>
                  <BrowseContainer />
                </CardText>
              </Card>
            </Tab>

            <Tab label="Cart" value="cart">
              <Card style={style.cart}>
                <CardText>
                  <CartContainer />
                </CardText>
              </Card>
            </Tab>
          </Tabs>
        </Col>

        <Col style={style.column} md={9} mdPull={3}>
          <CalendarContainer />
        </Col>
      </Row>
    </Grid>
    {/* Gray out rest of screen when selecting components */}
    {selectingComponent && <div style={style.overlay}></div>}
  </div>
);

Serif.propTypes = {
  selectingComponent: React.PropTypes.bool,
  tabState: React.PropTypes.string,
  handleTabChange: React.PropTypes.func,
  firstVisit: React.PropTypes.bool,
  onFirstVisit: React.PropTypes.func
};

Serif = connect(mapStateToProps, mapDispatchToProps)(Serif);

export default Serif;
