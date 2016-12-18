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
  currentView,
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
        {currentView === 'sections' &&
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
  currentView: React.PropTypes.string,
  selected: React.PropTypes.shape({
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }),
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  calendar: React.PropTypes.shape({
    sections: React.PropTypes.array,
    components: React.PropTypes.array
  }),
  checkComponents: React.PropTypes.func,
  addCourse: React.PropTypes.func,
  onSelect: React.PropTypes.func
};

export default SearchWrapper;
