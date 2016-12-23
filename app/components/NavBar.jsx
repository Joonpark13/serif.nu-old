import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import { IndexLink, Link } from 'react-router';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={this.handleToggle} title="Serif.nu" />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <List>
            <ListItem
              containerElement={<IndexLink to="/" />}
              onTouchTap={this.handleToggle}
              primaryText="Serif.nu"
            />
            <ListItem
              containerElement={<Link to="/about" />}
              onTouchTap={this.handleToggle}
              primaryText="About"
            />
            <ListItem
              containerElement={<Link to="/faq" />}
              onTouchTap={this.handleToggle}
              primaryText="FAQ"
            />
            <ListItem
              containerElement={<Link to="/bug" />}
              onTouchTap={this.handleToggle}
              primaryText="Report a Bug"
            />
            <ListItem
              containerElement={<Link to="/contact" />}
              onTouchTap={this.handleToggle}
              primaryText="Contact"
            />
          </List>
        </Drawer>
      </div>
    );
  }
}
