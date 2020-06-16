import {
  SET_CURRENT, SET_CHOICE
} from '../types';

export default (state, action) => {
  switch (action.type) {



    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case SET_CHOICE:
      return {
        ...state,
        choice: action.payload
      };

    default:
      return state;
  }
};
