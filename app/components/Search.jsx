import React from 'react';
import TextField from 'material-ui/TextField';
import Fuse from 'fuse.js';
import { List, ListItem } from 'material-ui/List';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
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
      // TODO: Search query is too long message
      // TODO: Search returned no results message
      if (query.length >= 32 || query.length < 3) this.setState({ results: [] });
      else {
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

        this.setState({ results: results.slice(0, 25) });
      }
    }, 300);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Search for classes"
          fullWidth
          value={this.state.query}
          onChange={this.handleChange}
        />
        <List>
          {this.state.results && this.state.results.map(searchResult => {
            const item = searchResult.item;
            return (
              <ListItem
                key={item.id}
              >
                <h4>{item.title}</h4>
                <p>{item.instructor}</p>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
Search.propTypes = {
  currentTerm: React.PropTypes.string,
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func
};
