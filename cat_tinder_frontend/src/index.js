import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration'
import registerServiceWorker from './registerServiceWorker';

//master router, on / render App,

ReactDOM.render(
  <Router>
    <div>
      <Route
        exact
        path='/'
        component={App}
      />
      <Route
        exact
        path='/Registration'
        component={Registration}
      />
      <Route
        exact
        path='/Login'
        component={Login}
      />
    </div>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
