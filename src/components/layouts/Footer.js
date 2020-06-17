import React from 'react';

const Footer = () => {
  return (
    <footer
      className='page-footer red accent-2 '
      style={{
        position: 'relative',
        bottom: '0',
        width: '100%',
        paddingTop: '0',
      }}
    >
      <div className='footer-copyright ' style={{ minHeight: '0px', padding: '0' }}>

        <div
          className='container '
          style={{ textAlign: 'center', display: 'inline' }}
        >
          <p>© 2016-2020 ANNAI PAINT BRUSH</p>
        </div>
        <a className='grey-text text-lighten-4 right develop' href='https://www.linkedin.com/in/gokul-kumar-52aa86195/' target="_blank" rel="noopener noreferrer">
          @Gokul Kumar
        </a>
      </div>
    </footer>
  );
};

export default Footer;
