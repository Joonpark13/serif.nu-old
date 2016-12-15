import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Search from './Search.jsx';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  searchGroup: {
    margin: 'auto',
    width: 300
  },
  icon: {
    verticalAlign: 'middle'
  },
  loading: {
    display: 'block',
    margin: 'auto'
  }
};

const SearchWrapper = ({ searchData, isFetching }) => {
  if (!isFetching) {
    return (
      <div style={style.searchGroup}>
        <FontIcon style={style.icon} className="material-icons">search</FontIcon>
        <Search searchdata={searchData} />
      </div>
    );
  }
  // If data did not load
  return <CircularProgress style={style.loading} />;
};

export default SearchWrapper;

SearchWrapper.propTypes = {
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isFetching: React.PropTypes.bool
};
