import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';

import {

  SET_CURRENT,
  SET_CHOICE
} from '../types';
const ProductState = (props) => {
  const initialState = {
    current: {
      text: '',
      src: 'TAPPER 1.5 INCH',
    },
    choice: 1
  };

  const [state, dispatch] = useReducer(productReducer, initialState);



  // Set Current
  const setCurrent = (data) => {
    dispatch({ type: SET_CURRENT, payload: data });
  };
  const setChoice = (n) => {
    dispatch({ type: SET_CHOICE, payload: n });
  };


  return (
    <ProductContext.Provider
      value={{

        current: state.current,
        choice: state.choice,
        setCurrent,
        setChoice

      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
