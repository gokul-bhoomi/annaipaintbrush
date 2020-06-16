import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';

import {

  SET_CURRENT
} from '../types';
const ProductState = (props) => {
  const initialState = {
    current: {
      text: '',
      src: 'TAPPER 1.5 INCH',
    }
  };

  const [state, dispatch] = useReducer(productReducer, initialState);



  // Set Current
  const setCurrent = (data) => {
    dispatch({ type: SET_CURRENT, payload: data });
  };


  return (
    <ProductContext.Provider
      value={{

        current: state.current,

        setCurrent,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
