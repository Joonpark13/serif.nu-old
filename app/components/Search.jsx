import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class Search extends React.Component {
  render() {
    return (
        <AutoComplete
          hintText="Search for classes"
          dataSource={this.props.searchdata}
          maxSearchResults={12}
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
  searchdata: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func
};
