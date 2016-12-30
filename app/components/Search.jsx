import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const combineFilters = (searchText, key) => {
  if (searchText.length < 3) return false; // Set min character number for search
  return AutoComplete.caseInsensitiveFilter(searchText, key);
};

const Search = ({ currentTerm, searchData, onSelect }) => (
  <AutoComplete
    hintText="Search for classes"
    dataSource={searchData}
    // maxSearchResults={12}
    filter={combineFilters}
    fullWidth
    onNewRequest={(chosenRequest, index) => {
      if (index !== -1) { // Make sure not triggered by hitting enter.
        onSelect(currentTerm, chosenRequest.school, chosenRequest.subject, chosenRequest.course);
      }
    }}
    // textFieldStyle={{ fullWidth: true }}
    menuStyle={{ height: '500px' }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    targetOrigin={{ vertical: 'top', horizontal: 'right' }}
  />
);

Search.propTypes = {
  currentTerm: React.PropTypes.string,
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func
};

export default Search;
