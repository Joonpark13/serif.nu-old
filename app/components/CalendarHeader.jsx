import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';

import html2canvas from '../js/html2canvas';

const style = {
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center'
  },
  dialogContent: {
    width: '100%',
    maxWidth: 'none'
  },
  dialogBody: {
    minHeight: '500px' // actual height of fullcalendar element
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    marginBottom: '20px'
  },
  messagePrompt: {
    marginRight: '10px'
  },
  messageBox: {
    width: '450px'
  }
};

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.currentCalendarName,
      open: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.currentCalendarName });
  }
  handleOpen() {
    this.setState({ open: true });
    html2canvas(document.getElementById('calendar')).then(canvas => {
      $(canvas).css('width', '700px');
      $(canvas).css('margin', 'auto');
      $(canvas).css('display', 'block');
      document.getElementById('screenshot').appendChild(canvas);
    });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.setCalendarName(event.target.value);
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label="Share"
        primary
        onTouchTap={() => {
          this.handleClose();
          this.props.handleFacebook();
        }}
      />
    ];
    return (
      <div>
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
              onTouchTap={() => this.handleOpen()}
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
        <Dialog
          title="Share to Facebook"
          actions={actions}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
          autoScrollBodyContent
          contentStyle={style.dialogContent}
        >
          <div style={style.dialogBody}>
            <div id="screenshot"></div>
            <div style={style.message}>
              <h4 style={style.messagePrompt}>Message: </h4>
              <TextField
                id="facebook-message"
                hintText="Say something about your schedule."
                multiLine
                style={style.messageBox}
              />
            </div>
          </div>
        </Dialog>
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
