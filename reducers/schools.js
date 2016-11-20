const initialState = {
  schoolsData: {
    isFetching: false,
    lastUpdated: 0,
    schools: []
  }
};

function schools(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_SCHOOLS':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_SCHOOLS':
      return {
        ...state,
        isFetching: false,
        schools: action.schools,
        lastUpdated: receivedAt
      }
    default:
      return state;
  }
}

export default schools;
