import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import registerServiceWorker from './registerServiceWorker';

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
        path='/Login'
        component={Login}
      />
    </div>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
