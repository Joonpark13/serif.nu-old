import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const style = {
  box: {
    display: 'inline-flex',
    alignItems: 'center'
  }
};

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOpen: false,
      deleteOpen: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
  }
  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      listOpen: true,
      anchorEl: event.currentTarget
    });
  }
  handleRequestClose() {
    this.setState({
      listOpen: false
    });
  }
  handleCloseDelete() {
    this.setState({
      deleteOpen: false
    });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleCloseDelete}
      />,
      <FlatButton
        label={this.props.deleteLabel || 'Delete'}
        primary
        onTouchTap={() => {
          this.props.deleteCallback();
          this.handleCloseDelete();
        }}
      />
    ];

    return (
      <div style={Object.assign({}, style.box, this.props.style)}>
        {this.props.deleteButton ?
          <Chip
            onTouchTap={this.handleTouchTap}
            onRequestDelete={() => this.setState({ deleteOpen: true })}
          >
            <Avatar icon={<FontIcon className="material-icons">expand_more</FontIcon>} />
            {this.props.displayValue[this.props.primaryTextValue]}
          </Chip>
        :
          <Chip onTouchTap={this.handleTouchTap}>
            <Avatar icon={<FontIcon className="material-icons">expand_more</FontIcon>} />
            {this.props.displayValue[this.props.primaryTextValue]}
          </Chip>
        }
        <Popover
          anchorEl={this.state.anchorEl}
          open={this.state.listOpen}
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

        <Dialog
          title={this.props.deleteTitle}
          actions={actions}
          modal={false}
          open={this.state.deleteOpen}
          onRequestClose={this.handleCloseDelete}
        >
          {this.props.deleteMessage}
        </Dialog>
      </div>
    );
  }
}

DropDown.propTypes = {
  promptText: React.PropTypes.string,
  displayValue: React.PropTypes.object,
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  primaryTextValue: React.PropTypes.string,
  onSelect: React.PropTypes.func,
  deleteButton: React.PropTypes.bool,
  deleteCallback: React.PropTypes.func,
  deleteLabel: React.PropTypes.string,
  deleteMessage: React.PropTypes.string,
  deleteTitle: React.PropTypes.string
};
