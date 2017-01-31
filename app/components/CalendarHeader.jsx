import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';

import html2canvas from '../js/html2canvas';
import { northwesternPurple } from '../colors';

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
    minHeight: '500px' // Needs to be set in order for dialog to be displayed correctly.
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

// http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

const postPhoto = (blob, authToken, message, callback) => {
  const fd = new FormData();
  fd.append('access_token', authToken);
  fd.append('source', blob);
  fd.append('message', message);
  $.ajax({
    url: `https://graph.facebook.com/me/photos?access_token=${authToken}`,
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    cache: false,
    success: (data) => {
      callback();
    },
    error: (shr, status, data) => {
      console.log(`Error: ${data}, status ${shr.status}`);
    }
  });
};


class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.currentCalendarName,
      open: false,
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.currentCalendarName });
  }
  handleOpen() {
    html2canvas(document.getElementById('calendar')).then(canvas => {
      $(canvas).css('width', '700px');
      $(canvas).css('margin', 'auto');
      $(canvas).css('marginTop', '10px');
      $(canvas).css('display', 'block');
      // Write the term name on the top left
      const ctx = canvas.getContext('2d');
      ctx.font = '15px Roboto';
      ctx.fillText(this.props.currentTermName, 6, 18);
      // Write 'Serif.nu' on the bottom right
      ctx.font = '20px Roboto';
      ctx.fillStyle = northwesternPurple;
      ctx.fillText('Serif.nu', canvas.width - 80, canvas.height - 15);

      this.setState({ open: true, canvas });
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
  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }
  handleFacebook() {
    // http://stackoverflow.com/questions/16214300/upload-base64-image-facebook-graph-api
    const dataUrl = this.state.canvas.toDataURL();
    const blob = dataURItoBlob(dataUrl);

    FB.login(newResponse => {
      if (newResponse.authResponse) {
        postPhoto(
          blob,
          newResponse.authResponse.accessToken,
          this.state.message,
          () => this.props.facebookPosted()
        );
      }
    }, { scope: 'publish_actions' });
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
          this.handleFacebook();
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
              <FontIcon className="fa fa-facebook-official" color="#3b5998" />
            </IconButton>
            <IconButton
              tooltip="Save to Google Calendar"
              tooltipPosition="top-center"
              onTouchTap={() => this.props.handleAuth()}
              disabled={!this.props.hasClasses}
            >
              <FontIcon className="material-icons">event_note</FontIcon>
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
                value={this.state.message}
                onChange={this.handleMessageChange}
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
  currentTermName: React.PropTypes.string,
  facebookPosted: React.PropTypes.func
};

export default CalendarHeader;
