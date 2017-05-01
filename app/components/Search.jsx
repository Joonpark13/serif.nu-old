import React from 'react';
import TextField from 'material-ui/TextField';
import Fuse from 'fuse.js';
import { List, ListItem } from 'material-ui/List';

const style = {
  listWrapper: {
    height: '589px', // 685 - 96 (height of search box)
    overflow: 'auto'
  },
  highlight: {
    fontWeight: 'bold'
  },
  matchDesc: {
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
      fuseTitle: null,
      fuseInstructor: null,
      fuseOverview: null
    };
    this.timeout = null;

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      const options = {
        includeScore: true,
        shouldSort: true,
        includeMatches: true,
        minMatchCharLength: 3,
        threshold: 0.4,
        maxPatternLength: 32
      };

      options.keys = ['title'];
      this.setState({ fuseTitle: new Fuse(nextProps.searchData, options) });

      options.keys = ['instructors'];
      this.setState({ fuseInstructor: new Fuse(nextProps.searchData, options) });

      options.keys = ['overview_of_class', 'descriptions'];
      this.setState({ fuseOverview: new Fuse(nextProps.searchData, options) });
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (query.length >= 32) {
        this.setState({
          results: [],
          error: 'Your search query is too long.',
          floatingLabelText: ''
        });
      } else if (query.length == 0) {
        this.setState({
          results: [],
          error: '',
          floatingLabelText: ''
        });
      } else if (query.length < 3) {
        this.setState({
          results: [],
          error: '',
          floatingLabelText: 'Keep typing...'
        });
      } else {
        const results = this.state.fuseTitle.search(query);

        const instructorResults = this.state.fuseInstructor.search(query);
        instructorResults.forEach(item => {
          if (!results.some(existingItem => existingItem.item.id === item.item.id)) {
            results.push(item);
          }
        });

        const overviewResults = this.state.fuseOverview.search(query);
        overviewResults.forEach(item => {
          if (!results.some(existingItem => existingItem.item.id === item.item.id)) {
            results.push(item);
          }
        });

        if (results.length === 0) this.setState({ results: [], error: 'No results.', floatingLabelText: '' });
        else this.setState({ results: results.slice(0, 25), error: '', floatingLabelText: '' });
      }
    }, 300);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Search for classes"
          fullWidth
          errorText={this.state.error}
          floatingLabelText={this.state.floatingLabelText}
          value={this.state.query}
          onChange={this.handleChange}
        />
        <div style={style.listWrapper}>
          <List>
            {this.state.results && this.state.results.map(searchResult => {
              const item = searchResult.item;
              const match = searchResult.matches[0];
              const overviewMatch = [];
              const paddingChars = 30;
              if (match.key === 'overview_of_class') {
                match.indices.forEach((indexPair, iterIndex) => {
                  overviewMatch.push(
                    <p key={iterIndex} style={style.matchDesc}>
                      ...
                      {item.overview_of_class.substring(Math.min(0, indexPair[0] - paddingChars), indexPair[0])}
                      <span style={style.highlight}>{item.overview_of_class.substring(indexPair[0], indexPair[1])}</span>
                      {item.overview_of_class.substring(indexPair[1], Math.min(indexPair[1] + paddingChars, item.overview_of_class.length))}
                      ...
                    </p>
                  );
                });
              }
              return (
                <ListItem
                  key={item.id}
                >
                  <h4>{item.title}</h4>
                  <p>{item.instructors.join(', ')}</p>
                  {item.class_mtg_info.map((info, index) => (
                    <div key={index}>
                      <p>{info.meet_t}</p>
                      <p>{info.meet_l}</p>
                    </div>
                  ))}
                  {overviewMatch}
                  {match.key === 'descriptions' && <p style={style.matchDesc}>A match was found in the course description.</p>}
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  currentTerm: React.PropTypes.string,
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func
};
