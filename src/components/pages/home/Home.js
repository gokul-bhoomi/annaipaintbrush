import React, { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIntersection } from "react-use";
import gsap from "gsap";
import image from '../../../media/parallax.jpg';

import Slideshow from '../../layouts/SlideShow';
import Sketch from './Sketch';
import Cards from './Cards';
import Testimonial from './Testimonial';

const Home = () => {
  const sectionRef = useRef(null);
  const sectionReff = useRef(null);
  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.05

  });
  const intersectionn = useIntersection(sectionReff, {
    root: null,
    rootMargin: "0px",
    threshold: 0.2

  });

  const fadeIn = element => {
    gsap.to(element, 2, {
      opacity: 1,
      y: -60,
      ease: 'power4.out',

    });

  };
  const fadeOut = element => {
    gsap.to(element, 2, {
      opacity: 0,
      y: -20,
      ease: 'power4.out',

    });

  };
  intersection && intersection.isIntersecting ? fadeIn(".fadeIn") : fadeOut(".fadeIn");
  intersectionn && intersectionn.isIntersecting ? fadeIn(".grow") : fadeOut(".grow");


  return (
    <Fragment>

      <Slideshow />
      <h4 style={{ textAlign: 'center', color: '#01579b', fontWeight: 'bold', margin: 0 }}>Welcome to Annai Paint Brush</h4>
      <p style={{ textAlign: 'center', color: '#01579b' }}>Magic With Colours</p>
      <Link className="btn side" to="/contactus">  <i className="material-icons">local_phone</i>
      </Link>
      <div ref={sectionRef}>
        <Sketch />

      </div>

      <h3 style={{ marginTop: '1em' }}>Why choose us?</h3>
      <div ref={sectionReff}>
        <Cards />
      </div>
      <div className="parallax-container" style={{ height: '300px' }}>
        <div className="parallax"><img src={image} alt="paint_brush" /></div>
      </div>
      <Testimonial />

      <a href="#top"><button className='btn onlymobile' style={{ margin: 'auto', marginBottom: '2em', display: 'block', borderRadius: '50px' }}>Use Navigation on the top left corner</button></a>

    </Fragment>


  );
};

export default Home;
