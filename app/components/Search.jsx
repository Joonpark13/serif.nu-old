import React from 'react';
import TextField from 'material-ui/TextField';
import elasticlunr from 'elasticlunr';
import { List, ListItem } from 'material-ui/List';

import { inCalendar } from '../helpers';
import Components from './Components.jsx';

const style = {
  listWrapper: {
    height: '589px', // 685 - 96 (height of search box)
    overflow: 'auto'
  },
  highlight: {
    fontWeight: 'bold'
  },
  disabledTitle: {
    opacity: 0.35
  },
  bodyText: {
    fontSize: 'small'
  },
  disabledBodyText: {
    fontSize: 'small',
    opacity: 0.35
  },
  matchDesc: {
    fontSize: 'small'
  },
  disabledMatchDesc: {
    opacity: 0.35,
    fontSize: 'small'
  }
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      error: '',
      floatingLabelText: '',
      results: [],
      index: null,
      overflow: false
    };
    this.timeout = null;

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const index = elasticlunr(function() { // Can't be an arrow function due to this binding
      this.addField('title');
      this.addField('instructor');
      this.setRef('id');
    });

    nextProps.searchData.forEach((obj) => {
      index.addDoc(obj);
    });

    this.setState({ index });
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });

    // Remove all hover events in case search changed while mouse was
    // over a section and it did not fire a mouseleave event
    this.props.removeHover();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (query.length >= 64) {
        this.setState({
          results: [],
          error: 'Your search query is too long.',
          floatingLabelText: '',
          overflow: false
        });
      } else if (query.length === 0) {
        this.setState({
          results: [],
          error: '',
          floatingLabelText: '',
          overflow: false
        });
      } else if (query.length < 3) {
        this.setState({
          results: [],
          error: '',
          floatingLabelText: 'Keep typing...',
          overflow: false
        });
      } else {
        const resultIds = this.state.index.search(query);
        const results = resultIds.map(
          (result) => this.props.searchData.find(dataObj => dataObj.id === result.ref)
        );

        const maxResults = 25;
        if (results.length === 0) {
          this.setState({
            results: [],
            error: 'No results.',
            floatingLabelText: '',
            overflow: false
          });
        } else {
          this.setState({
            results: results.slice(0, maxResults),
            error: '',
            floatingLabelText: '',
            overflow: results.length > maxResults
          });
        }
      }
    }, 300);
  }

  render() {
    const {
      currentTerm,
      currentCalendar,
      searchData,
      isFetching,
      currentView,
      selected,
      sections,
      calendar,
      onSelect,
      checkComponents,
      addCourse,
      addComponent,
      addCourseHover,
      addComponentHover,
      removeHover,
      showSearch
    } = this.props;
    return (
      <div>
        <TextField
          hintText="Enter classname, instructor, or keywords"
          fullWidth
          errorText={this.state.error}
          floatingLabelText={this.state.floatingLabelText}
          value={this.state.query}
          onChange={this.handleChange}
        />
        <div style={style.listWrapper}>
          {currentView === 'search' &&
            <List>
              {this.state.results && this.state.results.map(item => {
                const inCal = inCalendar(calendar.get('sections'), item.id, currentTerm, currentCalendar);

                return (
                  <ListItem
                    key={item.id}
                    disabled={inCal}
                    onMouseEnter={() => {
                      if (!inCal) {
                        addCourseHover(item);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!inCal) {
                        removeHover();
                      }
                    }}
                    onTouchTap={() => {
                      checkComponents(selected.subject, item.associated_classes);
                      addCourse(item);
                      removeHover();
                    }}
                  >
                    {inCal ? <h4 style={style.disabledTitle}>{item.title}</h4> : <h4>{item.title}</h4>}
                    {item.class_mtg_info.map((info, index) => (
                      <div key={index}>
                        <p style={inCal ? style.disabledBodyText : style.bodyText}>{info.meet_t}</p>
                        <p style={inCal ? style.disabledBodyText : style.bodyText}>{info.meet_l}</p>
                      </div>
                    ))}
                    <p style={inCal ? style.disabledBodyText : style.bodyText}>{item.instructor.join(', ')}</p>
                  </ListItem>
                );
              })}
              {this.state.overflow && (
                <ListItem disabled >
                  <p>Keep typing to see more results.</p>
                </ListItem>
              )}
            </List>
          }
          {currentView === 'components' &&
            <Components
              selected={selected}
              sections={this.state.results.map(result => result.item)}
              addComponent={addComponent}
              addComponentHover={addComponentHover}
              removeHover={removeHover}
            />
          }
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  currentTerm: React.PropTypes.string,
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selected: React.PropTypes.shape({
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }).isRequired,
  calendar: React.PropTypes.shape({
    sections: React.PropTypes.array,
    components: React.PropTypes.array
  }),
  currentView: React.PropTypes.string,
  onSelect: React.PropTypes.func,
  checkComponents: React.PropTypes.func.isRequired,
  addCourse: React.PropTypes.func.isRequired,
  addComponent: React.PropTypes.func,
  addCourseHover: React.PropTypes.func,
  addComponentHover: React.PropTypes.func,
  removeHover: React.PropTypes.func
};
