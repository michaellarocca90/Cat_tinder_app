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

class NewCat extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        name: '',
        age: '',
        enjoys: '',
        city: ''
      }
    }
  }

  handleChange(event){
    const formState = Object.assign({},this.state.form)
    formState[event.target.name] = event.target.value
    this.setState({form: formState})
  }

  handleSubmit(){
    this.props.onSubmit(this.state.form)
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
