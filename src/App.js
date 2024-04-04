// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        {/* Configura altre route qui */}
      </Switch>
    </Router>
  );
}

export default App;
