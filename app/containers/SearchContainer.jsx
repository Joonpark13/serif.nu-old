import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper.jsx';
import {
  addCourseSearch,
  populateSelected,
  fetchSectionsSearch,
  addComponentSearch,
  addCourseHover,
  addComponentHover,
  removeHover,
  showSearch,
  showComponents,
  showCourses
} from '../action-creators';

const mapStateToProps = state => ({
  currentTerm: state.terms.currentTerm,
  currentCalendar: state.calendar.get('currentCalendar'),
  searchData: state.search.data.autocomplete.items,
  isFetching: state.search.data.isFetching,
  currentView: state.search.currentView,
  selected: state.search.selected,
  sections: state.search.data.sections.items,
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  onSelect: (currentTerm, schoolId, subjectAbbv, courseAbbv) => {
    dispatch(populateSelected(schoolId, subjectAbbv, courseAbbv));
    dispatch(fetchSectionsSearch(currentTerm, schoolId, subjectAbbv, courseAbbv));
  },
  checkComponents: (subjectAbbv, associatedClasses) => {
    if (associatedClasses) dispatch(showComponents());
    else dispatch(showSearch());
  },
  addCourse: (section) => {
    dispatch(addCourseSearch(section));
  },
  addComponent: (detail) => {
    dispatch(addComponentSearch(detail));
  },
  addCourseHover: (section) => {
    dispatch(addCourseHover(section));
  },
  addComponentHover: (detail) => {
    dispatch(addComponentHover(detail));
  },
  removeHover: (sectionId) => {
    dispatch(removeHover(sectionId));
  },
  showSearch: () => {
    dispatch(showSearch());
  }
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchWrapper);
export default SearchContainer;
