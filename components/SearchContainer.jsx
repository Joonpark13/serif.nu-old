import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Search from './Search.jsx';

const style = {
  searchGroup: {
    margin: 'auto',
    width: 300
  },
  icon: {
    verticalAlign: 'middle'
  }
};

const SearchContainer = (searchdata) => (
  <div style={style.searchGroup}>
    <FontIcon style={style.icon} className="material-icons">search</FontIcon>
    <Search searchdata={[]} />
  </div>
);

export default SearchContainer;
