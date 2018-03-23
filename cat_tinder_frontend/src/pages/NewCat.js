import React, { Component } from 'react';
import {
  Col,
  Row,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Alert,
  HelpBlock
} from 'react-bootstrap'
import AuthService from '../services/AuthService';

class NewCat extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService()
    this.state = {
      form:{
        name: '',
        age: '',
        enjoys: '',
        city: '',
        user_id: '',
        avatar_base: null
      }
    }
  }

  handleChange(event){
    const formState = Object.assign({},this.state.form)
    formState[event.target.name] = event.target.value
    formState.user_id = this.Auth.getUserId()
    this.setState({form: formState})
  }

  handleSubmit(){
    this.props.onSubmit(this.state.form)
  }

  getBase64(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  fileChangeHandler(event){
    const file = event.target.files[0]
    this.getBase64(file).then( (fileString) => {
        const { form } = this.state
        form.avatar_base = fileString
        this.setState({form: form})
    })
  }

  errorsFor(attribute){
    var errorString = ""
    if(this.props.errors && this.props.errors[attribute]){
      const errors = this.props.errors[attribute]
      if(errors){
        errorString = errors.join(", ")
      }
    }
    return errorString === "" ? null : errorString
  }

  render() {
    return (
      <form>
        <Row>
          <Col xs={6}>
            {this.props.errors &&
              <Alert bsStyle="danger">
                Please check the form and try again.
              </Alert>
            }
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormGroup
              id="name-form-group"
              validationState={this.errorsFor('name') && 'error'}>
              <ControlLabel id="name">Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                value={this.state.form.name}
                onChange={this.handleChange.bind(this)}
              />
              {this.errorsFor('name') &&
                <HelpBlock id="name-help-block">{this.errorsFor('name')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup
              id="age-form-group"
              validationState={this.errorsFor('age') && 'error'}>
              <ControlLabel id="age">Age</ControlLabel>
              <FormControl
              name="age"
              type="number"
              onChange={this.handleChange.bind(this)}
              value={this.state.form.age}
              />
              {this.errorsFor('age') &&
                <HelpBlock id="age-help-block">{this.errorsFor('age')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup
              id="enjoys-form-group"
              validationState={this.errorsFor('enjoys') && 'error'}>
              <ControlLabel id="enjoys">Enjoys</ControlLabel>
              <FormControl
              name="enjoys"
              componentClass='textarea'
              onChange={this.handleChange.bind(this)}
              value={this.state.form.enjoys}
              />
              {this.errorsFor('enjoys') &&
                <HelpBlock id="enjoys-help-block">{this.errorsFor('enjoys')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup
              id="city-form-group"
              validationState={this.errorsFor('city') && 'error'}>
              <ControlLabel id="city">City</ControlLabel>
              <FormControl
              name="city"
              type='text'
              onChange={this.handleChange.bind(this)}
              value={this.state.form.city}
              />
              {this.errorsFor('city') &&
                <HelpBlock id="city-help-block">{this.errorsFor('city')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel id="avatar">Image</ControlLabel>
              <input
                type="file"
                onChange={this.fileChangeHandler.bind(this)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
          //change this button
            <Button
              id="submit"
              onClick={this.handleSubmit.bind(this)}
             >Create Cat Profile!</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default NewCat
