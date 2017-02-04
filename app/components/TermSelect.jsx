import React from 'react';
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
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  calendar: {
    display: 'inline-flex',
    alignItems: 'center'
  }
};

const TermSelect = ({
  terms,
  currentTerm,
  calendars,
  currentCalendar,
  changeTerm,
  changeCalendar,
  onlyCalendar,
  removeCalendar,
  addCalendar
}) => {
  // filteredTerm will be an undefined upon initalizing,
  // and will be object with matching id when populated
  const filteredTerm = terms.filter(matchId(currentTerm))[0];
  const filteredName = calendars.filter(matchId(currentCalendar))[0];

  return (
    <div style={style.wrapper}>
      {terms && currentTerm &&
        <DropDown
          promptText="Term"
          displayValue={filteredTerm}
          items={terms}
          primaryTextValue="term"
          onSelect={(term) => changeTerm(term.id)}
        />
      }
      <FontIcon className="material-icons">chevron_right</FontIcon>
      <div style={style.calendar}>
        {filteredName &&
          <DropDown
            promptText="Calendar"
            displayValue={filteredName}
            items={calendars}
            primaryTextValue="name"
            onSelect={(calendar) => changeCalendar(calendar.id)}
            deleteButton={!onlyCalendar} // If there is only one calendar, do not show delete button
            deleteCallback={removeCalendar}
            deleteLabel="Delete Schedule"
            deleteMessage="Are you sure you want to delete this schedule?"
            deleteTitle="Confirm Schedule Delete"
          />
        }
        <FloatingActionButton
          mini
          secondary
          onTouchTap={() => addCalendar()}
          style={style.add}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </div>
  );
};

TermSelect.propTypes = {
  terms: React.PropTypes.arrayOf(React.PropTypes.object),
  currentTerm: React.PropTypes.string,
  changeTerm: React.PropTypes.func,
  calendars: React.PropTypes.arrayOf(React.PropTypes.object),
  currentCalendar: React.PropTypes.number,
  changeCalendar: React.PropTypes.func,
  addCalendar: React.PropTypes.func,
  removeCalendar: React.PropTypes.func,
  onlyCalendar: React.PropTypes.bool
};

export default TermSelect;
