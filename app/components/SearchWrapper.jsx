import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Search from './Search.jsx';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
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
    return <Search searchData={searchData} />;
  }
  // If data did not load
  return <CircularProgress style={style.loading} />;
};

SearchWrapper.propTypes = {
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isFetching: React.PropTypes.bool
};

export default SearchWrapper;
