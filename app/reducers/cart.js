import $ from 'jquery';

import { initialSelected, initialDataDetails, details } from './helpers';

const initialCart = {
  swapping: false,
  selected: initialSelected,
  data: {
    details: initialDataDetails
  }
};

function cart(state = initialCart, action) {
  let newState = {};
  switch (action.type) {
    case 'SWAP_COMPONENT':
      newState = {
        swapping: true,
        selected: {
          school: action.schoolId,
          subject: action.subjectAbbv,
          course: action.courseAbbv,
          section: action.sectionId
        }
      };
      break;
    case 'REQUEST_DETAILS_CART':
    case 'RECEIVE_DETAILS_CART':
      newState = {
        data: {
          details: details(state.data.details, action)
        }
      };
      break;
    case 'ADD_COMPONENT_CART':
      return initialCart;
    default:
      return state;
  }
  return $.extend(true, {}, state, newState); // Deep copy
}

export default cart;
