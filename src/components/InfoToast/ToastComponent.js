import React, {useState} from 'react';
import {Toast, Row, Col,} from 'react-bootstrap';

export default class ToastComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      show:true
    }
  }

  render(){
    const {holdername, time, info} = this.props;
    const {show} = this.state;
    return (
          <Toast variant="dark" bg="dark" onClose={() => this.setState({show:false})} show={show} delay={4500} autohide
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{holdername}</strong>
              <small>{time}</small>
            </Toast.Header>
            <Toast.Body>{info}</Toast.Body>
          </Toast>
    );
  }
}
  
