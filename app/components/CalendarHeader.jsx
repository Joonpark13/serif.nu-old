import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const style = {
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center'
  }
};

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.currentCalendarName
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.currentCalendarName });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.setCalendarName(event.target.value);
  }
  render() {
    return (
      <div style={style.header}>
        <TextField
          id="current-calendar-name"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div style={style.buttons}>
          <IconButton
            tooltip="Share on Facebook"
            tooltipPosition="top-center"
            onTouchTap={() => this.props.handleFacebook()}
            disabled={!this.props.hasClasses}
          >
            <FontIcon className="fa fa-facebook-official" />
          </IconButton>
          <IconButton
            tooltip="Save to Google Calendar"
            tooltipPosition="top-center"
            onTouchTap={() => this.props.handleAuth()}
            disabled={!this.props.hasClasses}
          >
            <FontIcon className="material-icons">event_note</FontIcon>
          </IconButton>
          <IconButton
            tooltip="Remove Calendar"
            tooltipPosition="top-center"
            onTouchTap={() => this.props.removeCalendar()}
            disabled={this.props.onlyCalendar}
          >
            <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        </div>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  currentCalendarName: React.PropTypes.string,
  setCalendarName: React.PropTypes.func,
  removeCalendar: React.PropTypes.func,
  onlyCalendar: React.PropTypes.bool,
  handleAuth: React.PropTypes.func,
  hasClasses: React.PropTypes.bool,
  handleFacebook: React.PropTypes.func
};

export default CalendarHeader;
