import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';

import { matchId } from '../helpers';
import DropDown from './DropDown.jsx';

const style = {
  add: {
    display: 'inline',
    marginLeft: '10px'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  }
};

export default class TermSelect extends React.Component {
  render() {
    // filteredTerm will be an undefined upon initalizing,
    // and will be object with matching id when populated
    const filteredTerm = this.props.terms.filter(matchId(this.props.currentTerm))[0];

    const filteredName = this.props.calendars.filter(matchId(this.props.currentCalendar))[0];
    return (
      <div style={style.wrapper}>
        {/* TODO: Implement CircularProgress */}
        {this.props.terms && this.props.currentTerm &&
          <DropDown
            promptText="Term"
            displayValue={filteredTerm}
            items={this.props.terms}
            primaryTextValue="term"
            onSelect={(term) => this.props.changeTerm(term.id)}
          />
        }
        <FontIcon className="material-icons">chevron_right</FontIcon>
        {filteredName &&
          <DropDown
            promptText="Calendar"
            displayValue={filteredName}
            items={this.props.calendars}
            primaryTextValue="name"
            onSelect={(calendar) => this.props.changeCalendar(calendar.id)}
          />
        }
        <FloatingActionButton
          mini
          secondary
          onTouchTap={() => this.props.addCalendar()}
          style={style.add}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

TermSelect.propTypes = {
  terms: React.PropTypes.arrayOf(React.PropTypes.object),
  currentTerm: React.PropTypes.string,
  changeTerm: React.PropTypes.func,
  calendars: React.PropTypes.arrayOf(React.PropTypes.object),
  currentCalendar: React.PropTypes.number,
  changeCalendar: React.PropTypes.func,
  addCalendar: React.PropTypes.func
};
