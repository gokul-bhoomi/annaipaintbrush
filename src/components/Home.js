import React, { Fragment } from 'react';
import Slideshow from './layouts/SlideShow';
import Sketch from './layouts/Sketch';
const Home = () => {
  return (
    <Fragment>
      <Slideshow />
      <h4 style={{ textAlign: 'center', color: '#388e3c ', fontWeight: 'bold', margin: 0 }}>Welcome to Annai Paint Brush</h4>
      <p style={{ textAlign: 'center', color: '#388e3c' }}>Magic With Colours</p>
      <Sketch />

    </Fragment>
  );
};

export default Home;
