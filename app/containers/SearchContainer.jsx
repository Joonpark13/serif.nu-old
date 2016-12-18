import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper.jsx';
import { fetchDetails, addCourse, populateSelected, fetchSectionsSearch } from '../action-creators';

const mapStateToProps = state => ({
  searchData: state.search.data.autocomplete.items,
  isFetching: state.search.data.isFetching,
  currentView: state.search.currentView,
  selected: state.search.selected,
  sections: state.search.data.sections.items,
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  onSelect: (schoolId, subjectAbbv, courseAbbv) => {
    dispatch(populateSelected(schoolId, subjectAbbv, courseAbbv));
    dispatch(fetchSectionsSearch(schoolId, subjectAbbv, courseAbbv));
  },
  checkComponents: (schoolId, subjectAbbv, courseAbbv, sectionId) => {
    dispatch(fetchDetails(schoolId, subjectAbbv, courseAbbv, sectionId));
  },
  addCourse: (section) => {
    dispatch(addCourse(section));
  }
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchWrapper);
export default SearchContainer;
