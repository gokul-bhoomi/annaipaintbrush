import React from 'react';
import { Fade } from 'react-slideshow-image';

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  pauseOnHover: false,
};

const Slideshow = () => {
  return (
    <div>
      <div className='slide-container'>
        <Fade {...fadeProperties}>
          <div className='each-fade'>
            <div className='image-container'>
              <img
                src={require('../../media/slides/1.jpg')}
                style={{ zIndex: '-1' }}
                alt='roller'
              />
            </div>
          </div>
          <div className='each-fade'>
            <div className='image-container'>
              <img src={require('../../media/slides/2.jpg')} alt='brush' />
            </div>
          </div>
          <div className='each-fade'>
            <div className='image-container'>
              <img src={require('../../media/slides/3.jpg')} alt='annai' />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Slideshow;
