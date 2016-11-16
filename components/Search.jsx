import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class Search extends React.Component {
  componentDidMount() {
    store.dispatch(loadSchools(4650));
  }
  render() {
    return (
        <AutoComplete
          hintText="Search for classes"
          dataSource={this.props.searchdata}
          maxSearchResults={15}
          filter={AutoComplete.caseInsensitiveFilter}
          onNewRequest={(chosenRequest, index) => {
            if (index !== -1) { // Make sure not triggered by hitting enter.
                this.props.onSelect(chosenRequest);
                // This function should:
                    // Check if components exist for the chosen course
                    // If so, display the select component dialog
                    // Otherwise, add the course to the calendar
            }
          }}
        />
    );
  }
}

Search.propTypes = {
  searchdata: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func
};
