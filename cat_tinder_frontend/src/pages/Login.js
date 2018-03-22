import React, { Component } from 'react';
import '../Login.css';
import AuthService from '../services/AuthService';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Login extends Component {
  constructor(){
    super()
    this.Auth = new AuthService()
    this.state={
      email: '',
      password: ''
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit(e){
    e.preventDefault()
    this.Auth.login(this.state.email, this.state.password)
    .then(res =>{
      this.props.history.replace('/')
    })
    .catch(err =>{ alert(err) })
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Cat Tinder: Login</h1>
          <form
            onSubmit={this.handleFormSubmit.bind(this)}
          >
            <input
              className="form-item"
              placeholder="email goes here..."
              name="email"
              type="text"
              onChange={this.handleChange.bind(this)}
              value={this.state.email}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
            <Link
              to={`/Registration`}
              activeClassName='active'
            >
                <small className='subtitle'>Not Registered?</small>
            </Link>
        </div>
      </div>
    );
  }
}

export default Login;
