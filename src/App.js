import React, { useEffect } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <div>
        <Navbar />
        <Home />
      </div>
    </Router>
  );
};

export default App;
