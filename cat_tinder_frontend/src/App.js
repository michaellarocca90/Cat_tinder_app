import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import {
  Col,
  Grid,
  PageHeader,
  Row,
  Navbar,
  Nav,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import Cats from './pages/Cats'
import withAuth from './pages/withAuth'
import NewCat from './pages/NewCat'
import AuthService from './services/AuthService';

const Auth = new AuthService()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiURL: "http://localhost:3000",
      cats: [],
      newCatSuccess: false,
      errors: null
    }
  }

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login')
  }

  componentWillMount(){
  fetch(`${this.state.apiURL}/cats`)
  .then((rawResponse) => {
    return rawResponse.json()
  })
  .then((parsedResponse) => {
    this.setState({cats: parsedResponse})
  })
}

newCatSubmit(cat){
  debugger
  console.log(JSON.stringify(cat))
  fetch(`${this.state.apiURL}/cats`,
    {
      body: JSON.stringify(cat),
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST"
    }
  )
  .then((rawResponse)=>{
    console.log(rawResponse)
    return Promise.all([rawResponse.status, rawResponse.json()])
  })
  .then((parsedResponse) =>{
    if(parsedResponse[0] === 422){
      this.setState({errors: parsedResponse[1]})
    }else{
      const cats = Object.assign([], this.state.cats)
      cats.push(parsedResponse[1])
      this.setState({
        cats: cats,
        errors: null,
        newCatSuccess: true
      })
    }
  })
}

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={8}>
                    Cat Tinder
                    <small className='subtitle'>:Add a Cat</small>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <small>
                      <Link to='/cats' id='cats-link'>Show me the Cats!</Link>
                    </small>
                  </Col>
                </Row>
              </PageHeader>
              <NewCat
                onSubmit={this.newCatSubmit.bind(this)}
                errors={this.state.errors}
              />

              {this.state.newCatSuccess &&
                <Redirect to="/cats" />
              }
              <p className="App-intro">
                <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
              </p>
            </Grid>
          )} />
          <Route exact path="/cats" render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={8}>
                    Cat Tinder
                    <small className='subtitle'>:All the Cats</small>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <small>
                      <Link to='/'
                        id='cats-link'
                        onClick={()=>{this.setState({newCatSuccess: false})}}
                      >Add a Cat</Link>
                    </small>
                  </Col>
                </Row>
              </PageHeader>
              <Cats cats={this.state.cats} />

              {!this.state.newCatSuccess &&
                <Redirect to="/" />
              }
              <p className="App-intro">
                <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
              </p>
            </Grid>
          )} />
        </div>
      </Router>
    )
  }
}

export default withAuth(App);
