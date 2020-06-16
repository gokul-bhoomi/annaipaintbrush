import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import productContext from '../../context/product/productContext';

const Navbar = () => {
  const { setChoice } = useContext(productContext);
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
            <i className='material-icons' style={{ marginLeft: '1em' }}>
              menu
            </i>
          </a>
          <ul className='right hide-on-med-and-down '>
            <b>
              <li>
                <a href='/'>Home</a>
              </li>

              <li>
                <Link className="dropdown-trigger" data-target="dropdown5" to=''>Our Products</Link>
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
      <ul className='sidenav ' id='mobile-demo'>
        <b>
          <li>
            <a className="sidenav-close" href='/'>Home</a>
          </li>

          <li>
            <ul className="collapsible">
              <li className="bold">
                <a tabIndex="0" href="#!" className="collapsible-header waves-effect waves-teat" style={{ paddingLeft: '2.2em' }}>Our Products</a>
                <div className="collapsible-body">
                  <ul style={{ paddingLeft: '1em' }}>
                    <li><Link className="sidenav-close" to='/ourproducts' onClick={() => setChoice(1)}>Paint Brushes</Link></li>
                    <li><Link className="sidenav-close" to='/ourproducts' onClick={() => setChoice(2)}>Art Brushes</Link></li>
                    <li><Link className="sidenav-close" to='/ourproducts' onClick={() => setChoice(3)}>Paint Rollers</Link></li>
                    <li><Link className="sidenav-close" to='/ourproducts' onClick={() => setChoice(4)}>Putty Knives</Link></li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <a className=" modal-trigger sidenav-close" href="#modal1">Enquiry</a>
          </li>
          <li>
            <Link className="sidenav-close" to='/contactus'>Contact Us</Link>
          </li>
        </b>
      </ul>
      <ul id="dropdown5" className="dropdown-content fit" >
        <li><Link to='/ourproducts' onClick={() => setChoice(1)}>Paint Brushes</Link></li>
        <li><Link to='/ourproducts' onClick={() => setChoice(2)}>Art Brushes</Link></li>
        <li><Link to='/ourproducts' onClick={() => setChoice(3)}>Paint Rollers</Link></li>
        <li><Link to='/ourproducts' onClick={() => setChoice(4)}>Putty Knives</Link></li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
