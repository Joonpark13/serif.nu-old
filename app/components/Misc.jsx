import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

const style = {
  eventName: {
    marginTop: '10px',
    paddingLeft: '10px'
  },
  eventNameTextField: {
    marginLeft: '10px',
    width: '200px'
  },
  optionsMenu: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
    marginBottom: '10px'
  },
  timePickerTextField: {
    width: '150px'
  },
  timePicker: {
    marginBottom: '10px'
  },
  button: {
    float: 'right',
    marginBottom: '10px'
  },
  p: {
    margin: 0
  },
  invalidTime: {
    margin: 0,
    color: 'red',
    width: '150px'
  }
};

const defaultState = {
  eventName: '',
  daysOfWeek: [false, false, false, false, false],
  start: null,
  end: null
};

export default class Misc extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleEventNameChange = this.handleEventNameChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.validValues = this.validValues.bind(this);
    this.validTimes = this.validTimes.bind(this);
    this.validStart = this.validStart.bind(this);
    this.validEnd = this.validEnd.bind(this);
  }
  validStart() {
    // Start times must be after 8AM
    if (this.state.start && moment(this.state.start).hour() < 8) return false;
    return true;
  }
  validEnd() {
    // End times must be before 10PM
    if (this.state.end && moment(this.state.end).hour() > 22) return false;
    return true;
  }
  validTimes() {
    // Do not compute if either value has not been initialized
    if (!this.state.start || !this.state.end) return true;
    // Make sure end time is later than start time
    if (moment.duration(moment(this.state.end).diff(moment(this.state.start))).asMinutes() <= 0) {
      return false;
    }
    return true;
  }
  validValues() {
    // Makes sure all state contains valid values

    // Make sure event name is initialized
    if (!this.state.eventName) return false;
    // Make sure start and end times are initialized
    if (!this.state.start || !this.state.end) return false;
    // Make sure start and end times are valid
    if (!this.validStart() || !this.validEnd()) return false;
    // Make sure end time is after start time
    if (!this.validTimes()) return false;
    // Make sure at least once day of week is checked
    let trueFound = false;
    this.state.daysOfWeek.forEach(dow => {
      if (dow) trueFound = true;
    });
    return trueFound;
  }
  handleEventNameChange(event) {
    this.setState({
      eventName: event.target.value
    });
  }
  handleCheck(index) {
    const newDayOfWeek = !this.state.daysOfWeek[index];
    const newDaysOfWeek = this.state.daysOfWeek;
    newDaysOfWeek[index] = newDayOfWeek;
    this.setState({
      daysOfWeek: newDaysOfWeek
    });
  }
  handleStart(event, date) {
    this.setState({
      start: date
    });
  }
  handleEnd(event, date) {
    this.setState({
      end: date
    });
  }
  render() {
    const { addEvent } = this.props;
    return (
      <div>
        <h3>Add Custom Events</h3>

        <div style={style.eventName}>
          <p style={{ display: 'inline-block' }}>Event name:</p>
          <TextField
            style={style.eventNameTextField}
            hintText="Enter event name"
            value={this.state.eventName}
            onChange={this.handleEventNameChange}
          />
        </div>

        <div style={style.optionsMenu}>
          <div>
            <Checkbox
              checked={this.state.daysOfWeek[0]}
              label="Mon"
              onCheck={() => this.handleCheck(0)}
            />
            <Checkbox
              checked={this.state.daysOfWeek[1]}
              label="Tue"
              onCheck={() => this.handleCheck(1)}
            />
            <Checkbox
              checked={this.state.daysOfWeek[2]}
              label="Wed"
              onCheck={() => this.handleCheck(2)}
            />
            <Checkbox
              checked={this.state.daysOfWeek[3]}
              label="Thu"
              onCheck={() => this.handleCheck(3)}
            />
            <Checkbox
              checked={this.state.daysOfWeek[4]}
              label="Fri"
              onCheck={() => this.handleCheck(4)}
            />
          </div>

          <div>
            <p style={style.p} >Start:</p>
            <TimePicker
              style={style.timePicker}
              textFieldStyle={style.timePickerTextField}
              hintText="Pick a start time"
              value={this.state.start}
              onChange={this.handleStart}
            />
            <p style={style.p} >End:</p>
            <TimePicker
              style={style.timePicker}
              textFieldStyle={style.timePickerTextField}
              hintText="Pick an end time"
              value={this.state.end}
              onChange={this.handleEnd}
            />
            {!this.validTimes() && <p style={style.invalidTime}>You must pick an end time that is later than the start time.</p>}
            {!this.validStart() && <p style={style.invalidTime}>Start time must be after 8AM.</p>}
            {!this.validEnd() && <p style={style.invalidTime}>End time must be before 10PM.</p>}
          </div>
        </div>

        <FlatButton
          style={style.button}
          label="Add Event"
          primary
          disabled={!this.validValues()} // Prevent submission without valid values
          onTouchTap={() => {
            this.setState({
              ...defaultState,
              daysOfWeek: [false, false, false, false, false] // avoid deep copy issues
            });
            addEvent(this.state);
          }}
        />
      </div>
    );
  }
}

Misc.propTypes = {
  addEvent: React.PropTypes.func
};
