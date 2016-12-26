import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import Search from './Search.jsx';
import Sections from './Sections.jsx';
import Components from './Components.jsx';

const style = {
  icon: {
    verticalAlign: 'middle'
  },
  loading: {
    display: 'block',
    margin: 'auto'
  },
  divider: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subjectName: {
    marginTop: 0,
    marginBottom: 0
  }
};

const SearchWrapper = ({
  currentTerm,
  searchData,
  isFetching,
  currentView,
  selected,
  sections,
  details,
  calendar,
  checkComponents,
  addCourse,
  addComponent,
  addCourseHover,
  addComponentHover,
  removeHover,
  onSelect,
  showSearch
}) => {
  let view = null;
  const header = (
    <div>
      <div style={style.header}>
        <h3 style={style.subjectName}>{`${selected.subject} ${selected.course}`}</h3>
        {currentView === 'sections' &&
          <FlatButton label="cancel" primary onTouchTap={() => showSearch()} />
        }
      </div>
      <Divider style={style.divider} />
    </div>
  );
  if (currentView === 'search') {
    view = <Search currentTerm={currentTerm} searchData={searchData} onSelect={onSelect} />;
  } else if (currentView === 'sections') {
    view = (
      <div>
        {header}
        <Sections
          currentTerm={currentTerm}
          selected={selected}
          sections={sections}
          calendar={calendar}
          checkComponents={checkComponents}
          addCourse={addCourse}
          addCourseHover={addCourseHover}
          removeHover={removeHover}
        />
      </div>
    );
  } else if (currentView === 'components') {
    view = (
      <div>
        {header}
        <Components
          selected={selected}
          sections={sections}
          details={details}
          addComponent={addComponent}
          addComponentHover={addComponentHover}
          removeHover={removeHover}
        />
      </div>
    );
  }
  if (!isFetching) {
    return view;
  }
  // If data has not yet loaded
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
  addComponent: React.PropTypes.func,
  addCourseHover: React.PropTypes.func,
  addComponentHover: React.PropTypes.func,
  removeHover: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  showSearch: React.PropTypes.func
};

export default SearchWrapper;
