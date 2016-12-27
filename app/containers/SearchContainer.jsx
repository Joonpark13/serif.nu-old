import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper.jsx';
import {
  fetchDetailsSearch,
  addCourseSearch,
  populateSelected,
  fetchSectionsSearch,
  addComponentSearch,
  addCourseHover,
  addComponentHover,
  removeHover,
  showSearch
} from '../action-creators';

const mapStateToProps = state => ({
  currentTerm: state.terms.currentTerm,
  currentCalendar: state.calendar.get('currentCalendar'),
  searchData: state.search.data.autocomplete.items,
  isFetching: state.search.data.isFetching,
  currentView: state.search.currentView,
  selected: state.search.selected,
  sections: state.search.data.sections.items,
  details: state.search.data.details.info,
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  onSelect: (currentTerm, schoolId, subjectAbbv, courseAbbv) => {
    dispatch(populateSelected(schoolId, subjectAbbv, courseAbbv));
    dispatch(fetchSectionsSearch(currentTerm, schoolId, subjectAbbv, courseAbbv));
  },
  checkComponents: (currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId) => {
    dispatch(fetchDetailsSearch(currentTerm, schoolId, subjectAbbv, courseAbbv, sectionId));
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
