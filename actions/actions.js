import fetch from 'isomorphic-fetch';

export function loadSchools(termId) {
  return {
    type: 'LOAD_SCHOOLS',
    termId
  };
}

export function receiveSchools(termId, json) {
  return {
    type: 'RECEIVE_SCHOOLS',
    termId,
    schools: json.data.children.map(child => child.data), // ???
    receivedAt: Date.now()
  };
}

export function getSchools(termId) {
  return function (dispatch) {
    dispatch(loadSchools(termId));
    return fetch('http://www.northwestern.edu/class-descriptions/4650/index-v2.json')
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(data => dispatch(receiveSchools(termId, data)));
  };
}
