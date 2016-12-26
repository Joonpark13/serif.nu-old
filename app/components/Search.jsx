import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const Search = ({ currentTerm, searchData, onSelect }) => (
  <AutoComplete
    hintText="Search for classes"
    dataSource={searchData}
    maxSearchResults={12}
    filter={AutoComplete.caseInsensitiveFilter}
    fullWidth
    onNewRequest={(chosenRequest, index) => {
      if (index !== -1) { // Make sure not triggered by hitting enter.
        onSelect(currentTerm, chosenRequest.school, chosenRequest.subject, chosenRequest.course);
      }
    }}
  />
);

Search.propTypes = {
  currentTerm: React.PropTypes.string,
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func
};

export default Search;
