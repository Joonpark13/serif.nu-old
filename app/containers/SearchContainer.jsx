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
  removeHover
} from '../action-creators';

const mapStateToProps = state => ({
  searchData: state.search.data.autocomplete.items,
  isFetching: state.search.data.isFetching,
  currentView: state.search.currentView,
  selected: state.search.selected,
  sections: state.search.data.sections.items,
  details: state.search.data.details.info,
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  onSelect: (schoolId, subjectAbbv, courseAbbv) => {
    dispatch(populateSelected(schoolId, subjectAbbv, courseAbbv));
    dispatch(fetchSectionsSearch(schoolId, subjectAbbv, courseAbbv));
  },
  checkComponents: (schoolId, subjectAbbv, courseAbbv, sectionId) => {
    dispatch(fetchDetailsSearch(schoolId, subjectAbbv, courseAbbv, sectionId));
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
  }
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchWrapper);
export default SearchContainer;
