import React, { Component } from 'react';
import '../Registration.css';
import AuthService from '../services/AuthService';


class Registration extends Component {
  constructor(){
    super()
    this.Auth = new AuthService()
    this.state={
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      apiURL: "http://localhost:3000",
      newCatSuccess: false,
      errors: null,
      id: ''
    }
  }

  handleChange(event){
    const userState = Object.assign({},this.state.user)
    userState[event.target.name] = event.target.value
    this.setState({user: userState})
  }


//modify this function
  // handleFormSubmit(e){
  //   e.preventDefault()
  //   this.Auth.login(this.state.email, this.state.password)
  //   .then(res =>{
  //     this.props.history.replace('/')
  //   })
  //   .catch(err =>{ alert(err) })
  // }


  registrationSubmit(e){
    e.preventDefault()
    const user1 = this.state.user

    fetch(`${this.state.apiURL}/users`,
      {
        body: JSON.stringify(user1),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST"
      }
    )
    .then((rawResponse)=>{

      return Promise.all([rawResponse.status, rawResponse.json()])
    })
    .then((parsedResponse) =>{
      if(parsedResponse[0] === 422){
        this.setState({errors: parsedResponse[1]})
      }else{
        this.props.history.replace('/')
      }
    })
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>New Cat Owner!</h1>
          <form
            onSubmit={this.registrationSubmit.bind(this)}
          >
            <input
              className="form-item"
              placeholder="name goes here..."
              name="name"
              type="text"
              onChange={this.handleChange.bind(this)}
              value={this.state.name}
            />
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
              className="form-item"
              placeholder="confirm password"
              name="password_confirmation"
              type="password"
              onChange={this.handleChange.bind(this)}
              value={this.state.password_confirmation}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
