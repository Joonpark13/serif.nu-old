import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';

const style = {
  box: {
    display: 'flex',
    alignItems: 'center'
  },
  currentTermText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: '10px'
  }
};

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  render() {
    return (
      <div style={Object.assign({}, style.box, this.props.style)}>
        <div style={style.currentTermText}>{this.props.promptText}:</div>
        <Chip onTouchTap={this.handleTouchTap}>
          <Avatar icon={<FontIcon className="material-icons">expand_more</FontIcon>} />
          {this.props.displayValue[this.props.primaryTextValue]}
        </Chip>
        <Popover
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          canAutoPosition={false}
        >
          <List>
            {this.props.items.map((item) => (
              <ListItem
                key={item.id}
                primaryText={item[this.props.primaryTextValue]}
                onTouchTap={() => {
                  this.props.onSelect(item);
                  this.handleRequestClose();
                }}
              />
            ))}
          </List>
        </Popover>
      </div>
    );
  }
}

DropDown.propTypes = {
  promptText: React.PropTypes.string,
  displayValue: React.PropTypes.object,
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  primaryTextValue: React.PropTypes.string,
  onSelect: React.PropTypes.func
};
