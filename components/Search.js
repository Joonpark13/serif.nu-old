import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete'

const style = {
    searchGroup: {
        margin: 'auto',
        width: 300
    },
    icon: {
        verticalAlign: 'middle'
    }
}

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style.searchGroup}>
                <FontIcon style={style.icon} className="material-icons">search</FontIcon>
                <AutoComplete
                    hintText="Search for classes"
                    dataSource={this.props.searchdata}
                    maxSearchResults={15}
                    filter={AutoComplete.caseInsensitiveFilter}
                    onNewRequest={(chosenRequest, index) => {
                        if (index != -1) { // Make sure not triggered by hitting enter.
                            this.props.onSelect(chosenRequest);
                            // This function should:
                                // Check if components exist for the chosen course
                                // If so, display the select component dialog
                                // Otherwise, add the course to the calendar
                        }   
                    }}  
                />
            </div>
        );
    }
}