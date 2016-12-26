import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import { matchId } from '../helpers';
import DropDown from './DropDown.jsx';

export default class TermSelect extends React.Component {
  // TODO: Make sure circular progress replaces all of the component when active
  render() {
    // filteredTerm will be an undefined upon initalizing,
    // and will be object with matching id when populated
    const filteredTerm = this.props.terms.filter(matchId(this.props.currentTerm))[0];
    return (
      <div>
        {this.props.terms && this.props.currentTerm ?
          <DropDown
            promptText="Term"
            displayValue={filteredTerm}
            items={this.props.terms}
            primaryTextValue="term"
            onSelect={(term) => this.props.changeTerm(term.id)}
          />
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
