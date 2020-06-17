import React, { useEffect } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Home from './components/pages/home/Home.js';
import Footer from './components/layouts/Footer';
import ContactUs from './components/pages/ContactUs';
import Modal from './components/layouts/Modal';
import Products from './components/pages/products/Products';
import Pmodal from './components/pages/products/Pmodal';
import ScrollToTop from './components/layouts/ScrollToTop';

import ProductState from './context/product/ProductState';


const App = () => {
  useEffect(() => {
    M.AutoInit();


  });
  return (
    <ProductState>
      <Router>
        <ScrollToTop>
          <Navbar />
          <Modal />
          <Pmodal />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/ContactUs' component={ContactUs} />
            <Route exact path='/ourproducts' component={Products} />
            <Route exact path='' component={Home} />

          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>

    </ProductState>
  );
};

export default App;
