import injectTapEventPlugin from 'react-tap-event-plugin'; // Needed for onTouchTap
import 'babel-polyfill'; // http://redux.js.org/docs/advanced/AsyncActions.html#note-on-fetch

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey500, white, fullBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import { Provider } from 'react-redux';

import colors from './colors';
import store from './store';
import NavBar from './components/NavBar.jsx';
import Serif from './components/Serif.jsx';
import { fetchSchools, fetchSearchData } from './action-creators';

// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.northwesternPurple,
    primary2Color: colors.northwesternPurple120,
    primary3Color: grey500,
    accent1Color: colors.northwesternPurple30,
    accent2Color: colors.richBlack10,
    accent3Color: colors.richBlack50,
    textColor: colors.richBlack80,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: colors.richBlack20,
    disabledColor: fade(colors.richBlack80, 0.3),
    pickerHeaderColor: colors.northwesternPurple,
    clockCircleColor: fade(colors.richBlack80, 0.07),
    shadowColor: fullBlack
  }
});

class App extends React.Component {
  render() {
    store.dispatch(fetchSchools());
    store.dispatch(fetchSearchData());

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div> {/* MuiThemeProvider requires stricly one child element */}
            <NavBar />
            <Serif />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
