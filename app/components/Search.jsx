import React from 'react';
import TextField from 'material-ui/TextField';
import Fuse from 'fuse.js';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });

    const options = {
      shouldSort: true,
      includeMatches: true,
      minMatchCharLength: 3,
      threshold: 0.4,
      keys: [{
        name: 'title',
        weight: 0.9
      }, {
        name: 'instructors',
        weight: 0.5
      }, {
        name: 'overview_of_class',
        weight: 0.3
      }, {
        name: 'descriptions',
        weight: 0.3
      }]
    };
    const fuse = new Fuse(this.props.searchData, options);
    const result = fuse.search(query);

    console.log(result);
  }

  render() {
    return (
      <TextField
        hintText="Search for classes"
        fullWidth
        value={this.state.query}
        onChange={this.handleChange}
      />
    );
  }
}
Search.propTypes = {
  currentTerm: React.PropTypes.string,
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func
};
