import { connect } from 'react-redux';

import SearchWrapper from '../components/SearchWrapper.jsx';

const mapStateToProps = (state) => ({
  searchData: state.data.search.items,
  isFetching: state.data.search.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: () => {
    dispatch();
  }
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchWrapper);
export default SearchContainer;
