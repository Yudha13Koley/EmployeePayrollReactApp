import './App.css';
import React from 'react';
import PayrollForm from './components/payroll-form/payroll-form';
import HomePage from './components/home-page/homepage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/payroll-form">
            <PayrollForm />
          </Route>
          <Route exact path="">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
