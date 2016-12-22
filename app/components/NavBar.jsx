import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

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
          Welcome to Serif! More info about the app will be coming soon.
        </Drawer>
      </div>
    );
  }
}
