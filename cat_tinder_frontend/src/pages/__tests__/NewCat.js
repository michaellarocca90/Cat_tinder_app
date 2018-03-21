import React from 'react';
import ReactDOM from 'react-dom';
import NewCat from '../NewCat';
import fetch from 'isomorphic-fetch';
import { mount } from 'enzyme'

it('renders without crashing', ()=> {
  const div = document.createElement('div')
  ReactDOM.render(<NewCat />, div)
})

it('has a name input', ()=>{
  const component = mount (<NewCat />)
  expect(component.find('label#name').text()).toBe("Name")
})

it('has a age input', ()=>{
  const component = mount (<NewCat />)
  expect(component.find('label#age').text()).toBe("Age")
})

it('has a enjoys input', ()=>{
  const component = mount (<NewCat />)
  expect(component.find('label#enjoys').text()).toBe("Enjoys")
})

it('has a submit button', ()=>{
  const component = mount (<NewCat />)
  expect(component.find('button#submit').text()).toBe("Create Cat Profile!")
})

it("calls submitHandler on submit", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewCat onSubmit={mockSubmitHandler}/>)
  component.find('button#submit').simulate('click', {button: 0})
  expect(mockSubmitHandler.mock.calls.length).toBe(1)
})

it("passes values on submit", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewCat onSubmit={mockSubmitHandler}/>)
  component.find('input[name="name"]').simulate('change', {target: {value: 'Paws', name: 'name'}})
  component.find('input[name="age"]').simulate('change', {target: {value: 2, name: 'age'}})
  component.find('textarea[name="enjoys"]').simulate('change', {target: {value: 'Scratches', name: 'enjoys'}})
  component.find('button#submit').simulate('click', {button: 0})

  const submittedValues = mockSubmitHandler.mock.calls[0][0]

  expect(submittedValues["name"]).toBe("Paws")
  expect(submittedValues["age"]).toBe(2)
  expect(submittedValues["enjoys"]).toBe("Scratches")
})

it("shows flash message when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = [
    {
      param: 'name',
      msg: 'Is required.'
    }
  ]
  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find(".alert-danger").length).toBe(1)
})
//name highlight
it("highlights name input when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    name: ['Is required.']
  }
  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find('#name-form-group.has-error').length).toBe(1)
})

it("no help message for name when there is no error", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewCat onSubmit={mockSubmitHandler}/>)
  expect(component.find("#name-help-block").length).toBe(0)
})
//help message on no name error
it("shows help message for name when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    name: ['Is required.']
  }

  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find("#name-help-block").length).toBe(1)
})

//age highlights
it("highlights age input when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    age: ['Is required.']
  }
  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find('#age-form-group.has-error').length).toBe(1)
})

it("no help message for age when there is no error", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewCat onSubmit={mockSubmitHandler}/>)
  expect(component.find("#age-help-block").length).toBe(0)
})

//help message on no age error
it("shows help message for age when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    age: ['Is required.']
  }

  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find("#age-help-block").length).toBe(1)
})

//enjoys highlights
it("highlights enjoys input when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    enjoys: ['Is required.']
  }
  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find('#enjoys-form-group.has-error').length).toBe(1)
})

it("no help message for enjoys when there is no error", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewCat onSubmit={mockSubmitHandler}/>)
  expect(component.find("#enjoys-help-block").length).toBe(0)
})

//help message on no enjoys error
it("shows help message for enjoys when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    enjoys: ['Is required.']
  }

  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find("#enjoys-help-block").length).toBe(1)
})

//city highlights
it("highlights city input when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    city: ['Is required.']
  }
  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find('#city-form-group.has-error').length).toBe(1)
})

it("no help message for city when there is no error", ()=>{
  const mockSubmitHandler = jest.fn()
  const component = mount(<NewCat onSubmit={mockSubmitHandler}/>)
  expect(component.find("#city-help-block").length).toBe(0)
})

//help message on no city error
it("shows help message for city when there is an error", ()=>{
  const mockSubmitHandler = jest.fn()
  const validationErrors = {
    city: ['Is required.']
  }

  const component = mount(<NewCat onSubmit={mockSubmitHandler} errors={validationErrors}/>)
  expect(component.find("#city-help-block").length).toBe(1)
})
