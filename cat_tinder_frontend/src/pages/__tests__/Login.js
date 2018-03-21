import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../Login'
import fetch from 'isomorphic-fetch';
import { mount } from 'enzyme'

it('Login page renders without crashing', ()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Login />, div)
})
