import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const Search = ({ searchData, onSelect }) => (
  <AutoComplete
    hintText="Search for classes"
    dataSource={searchData}
    maxSearchResults={12}
    filter={AutoComplete.caseInsensitiveFilter}
    fullWidth
    onNewRequest={(chosenRequest, index) => {
      if (index !== -1) { // Make sure not triggered by hitting enter.
        onSelect(chosenRequest.school, chosenRequest.subject, chosenRequest.course);
      }
    }}
  />
);

Search.propTypes = {
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func
};

export default Search;
