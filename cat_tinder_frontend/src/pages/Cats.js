import React, { Component } from 'react';
import '../Cats.css';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap'

class Cats extends Component {
  render() {
    return (
        <tbody>
          {this.props.cats.map((cat, index) =>{
            return (
              <div classname= "center">
                <div className= "card">
                  <tr key={index}>
                    <h2 className="cat-name">Name: {cat.name}</h2>
                    <p className="cat-img">
                      <img src={cat.avatar} height={150}/>
                    </p>
                    <ol className="cat-details">
                      <li>Age: {cat.age}</li>
                      <li>Enjoys: {cat.enjoys}</li>
                      <li>City: {cat.city}</li>
                    </ol>
                  </tr>
                </div>
              </div>
            )
          })}
        </tbody>
    );
  }
}
export default Cats
