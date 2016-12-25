import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

import { matchId } from '../helpers';

const style = {
  box: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8
  },
  currentTermText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: '10px'
  }
};

export default class TermSelect extends React.Component {
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

  // TODO: Make sure circular progress replaces all of the component when active
  render() {
    // filteredTerm will be an undefined upon initalizing,
    // and will be object with matching id when populated
    const filteredTerm = this.props.terms.filter(matchId(this.props.currentTerm))[0];
    return (
      <div style={style.box} >
        <div style={style.currentTermText}>Term:</div>
        <Chip onTouchTap={this.handleTouchTap}>
          <Avatar icon={<FontIcon className="material-icons">expand_more</FontIcon>} />
          {
            // Get most recent term name
            filteredTerm && filteredTerm.term
          }
        </Chip>
        {this.props.terms && this.props.currentTerm ?
          <Popover
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            canAutoPosition={false}
          >
            <List>
              {this.props.terms.map((term) => (
                <ListItem
                  key={term.id}
                  primaryText={term.term}
                  onTouchTap={() => {
                    this.props.changeTerm(term.id);
                    this.handleRequestClose();
                  }}
                />
              ))}
            </List>
          </Popover>
          :
          <CircularProgress />
        }
      </div>
    );
  }
}

TermSelect.propTypes = {
  terms: React.PropTypes.arrayOf(React.PropTypes.object),
  currentTerm: React.PropTypes.string,
  changeTerm: React.PropTypes.func
};
