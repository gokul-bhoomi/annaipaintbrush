import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <Fragment>
      <nav>
        <div className='nav-wrapper deep-orange' style={{ zIndex: '10' }}>
          <a href='/' className='brand-logo'>
            <img
              src={require('../../media/annai_logo.png')}
              alt='logo'
              className='logo'

            />
          </a>
          <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
            <i class='material-icons' style={{ marginLeft: '1em' }}>
              menu
            </i>
          </a>
          <ul className='right hide-on-med-and-down '>
            <b>
              <li>
                <a href='/'>Home</a>
              </li>

              <li>
                <Link to='/ourproducts'>Our Products</Link>
              </li>
              <li>
                <a className=" modal-trigger" href="#modal1">Enquiry</a>
              </li>
              <li>
                <Link to='contactus'>Contact Us</Link>
              </li>
            </b>
          </ul>

        </div>
      </nav>
      <ul class='sidenav sidenav-close' id='mobile-demo'>
        <b>
          <li>
            <a href='/'>Home</a>
          </li>

          <li>
            <Link to='/ourproducts'>Products</Link>
          </li>
          <li>
            <a className=" modal-trigger" href="#modal1">Enquiry</a>
          </li>
          <li>
            <Link to='/contactus'>Contact Us</Link>
          </li>
        </b>
      </ul>
    </Fragment>
  );
};

export default Navbar;
