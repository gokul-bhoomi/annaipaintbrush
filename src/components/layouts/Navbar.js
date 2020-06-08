import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <Fragment>
      <nav>
        <div className='nav-wrapper red accent-3' style={{ zIndex: '10' }}>
          <Link to='#!' className='brand-logo'>
            <img
              src={require('../../media/annai_logo.png')}
              alt='logo'
              className='logo'
            />
          </Link>
          <a href='#!' data-target='mobile-demo' class='sidenav-trigger'>
            <i class='material-icons' style={{ marginLeft: '1em' }}>
              menu
            </i>
          </a>
          <ul className='right hide-on-med-and-down '>
            <b>
              <li>
                <Link to='home'>Home</Link>
              </li>
              <li>
                <Link to='badges.html'>About Us</Link>
              </li>
              <li>
                <Link to='collapsible.html'>Products</Link>
              </li>
              <li>
                <Link to='mobile.html'>Place Order</Link>
              </li>
              <li>
                <Link to='mobile.html'>Contact Us</Link>
              </li>
            </b>
          </ul>
          <ul class='sidenav' id='mobile-demo'>
            <b>
              <li>
                <Link to='home'>Home</Link>
              </li>
              <li>
                <Link to='badges.html'>About Us</Link>
              </li>
              <li>
                <Link to='collapsible.html'>Products</Link>
              </li>
              <li>
                <Link to='mobile.html'>Place Order</Link>
              </li>
              <li>
                <Link to='mobile.html'>Contact Us</Link>
              </li>
            </b>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
