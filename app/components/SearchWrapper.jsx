import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import Search from './Search.jsx';
import Sections from './Sections.jsx';

const style = {
  icon: {
    verticalAlign: 'middle'
  },
  loading: {
    display: 'block',
    margin: 'auto'
  }
};

const SearchWrapper = ({
  searchData,
  isFetching,
  searchState,
  selected,
  sections,
  calendar,
  checkComponents,
  addCourse,
  onSelect
}) => {
  if (!isFetching) {
    return (
      <div>
        <Search searchData={searchData} onSelect={onSelect} />
        {searchState === 'sections' &&
          <Sections
            selected={selected}
            sections={sections}
            calendar={calendar}
            checkComponents={checkComponents}
            addCourse={addCourse}
          />
        }
      </div>
    );
  }
  // If data did not load
  return <CircularProgress style={style.loading} />;
};

SearchWrapper.propTypes = {
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isFetching: React.PropTypes.bool,
  searchState: React.PropTypes.string
};

export default SearchWrapper;
