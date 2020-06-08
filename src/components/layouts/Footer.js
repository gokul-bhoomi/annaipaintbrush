import React from 'react';

const Footer = () => {
  return (
    <footer
      class='page-footer red accent-2 '
      style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        paddingTop: '0',
      }}
    >
      <div class='footer-copyright ' style={{ minHeight: '0px', padding: '0' }}>
        <div
          class='container '
          style={{ textAlign: 'center', display: 'inline' }}
        >
          <p>© 2016-2020 ANNAI PAINT BRUSH</p>
        </div>
        <a class='grey-text text-lighten-4 right develop' href='#!'>
          @Gokul Kumar
        </a>
      </div>
    </footer>
  );
};

export default Footer;
