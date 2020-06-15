import {
  SET_CURRENT
} from '../types';

export default (state, action) => {
  switch (action.type) {



    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };


    default:
      return state;
  }
};
