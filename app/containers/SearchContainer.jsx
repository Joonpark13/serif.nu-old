import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper.jsx';
import { fetchDetails, addCourse, populateSelected, fetchSections } from '../action-creators';

const mapStateToProps = state => ({
  searchData: state.data.search.items,
  isFetching: state.data.search.isFetching,
  searchState: state.searchState,
  selected: state.selected,
  sections: state.data.sections.items,
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  onSelect: (schoolId, subjectAbbv, courseAbbv) => {
    dispatch(populateSelected(schoolId, subjectAbbv, courseAbbv));
    dispatch(fetchSections(schoolId, subjectAbbv, courseAbbv));
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
