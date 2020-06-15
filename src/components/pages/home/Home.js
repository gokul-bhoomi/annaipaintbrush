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
    console.log("hi");
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
      <a className="btn side" href="">  <i className="material-icons">local_phone</i>
      </a>
      <div ref={sectionRef}>
        <Sketch />
      </div>
      <h3 style={{ marginTop: '1em' }}>Why choose us?</h3>
      <div ref={sectionReff}>
        <Cards />
      </div>
      {image ? <div class="parallax-container" style={{ height: '300px' }}>
        <div class="parallax"><img src={image} alt="brush" /></div>
      </div> : 'hiii'}
      <Testimonial />
      <Link to='/ourproducts'><button className='btn' style={{ margin: 'auto', marginBottom: '2em', display: 'block', borderRadius: '50px' }}>Our Products</button></Link>
    </Fragment>


  );
};

export default Home;
