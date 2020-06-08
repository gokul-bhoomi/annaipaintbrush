import React, { useEffect } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Home from './components/Home.js';
import Footer from './components/layouts/Footer';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <Navbar />
      <Home />
      <Footer />
    </Router>
  );
};

export default App;
