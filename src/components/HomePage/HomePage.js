import React, { useState } from 'react';
import {Nav, Form, FormControl, Button, Navbar, Container, Row, Col} from 'react-bootstrap';
import auth from '../../helpers/auth'
import DynamicComponent from "./Dynamic";

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      comp:'blank'
    }
    this.logout = this.logout.bind(this)
  }

logout(){
  auth.logout(()=>{
    this.props.history.push('/');
  });
  localStorage.removeItem('p');
}

render(){
  const {comp} = this.state;

return(
<Container>
  <Row>
    <Col>
    <Navbar className="navbar navbar-default" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href={"#"} onClick={()=> this.setState({comp:'blank'})}>主页</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#consultations" onClick={()=> this.setState({comp:'consultation'})}
                  name={this.props.name}>诊断书</Nav.Link>
                <Nav.Link href="#medicines" onClick={()=> this.setState({comp:'medicine'})}
                  name={this.props.name}>药</Nav.Link>
                <Nav.Link href="#tests" onClick={()=> this.setState({comp:'testpage'})}
                  name={this.props.name}>检查</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" fixed="center" />
                <Button variant="outline-info">Search</Button>
            </Form>
            <label>{localStorage.getItem("p")}</label>
            <Button variant="outline-info" onClick={this.logout}>退出</Button>
        </Navbar>
    </Col>
  </Row>
  <Row>
    {/* <Col sm={2}>sm=2</Col> */}
    <Col lg={12}>
      <DynamicComponent comp={this.state.comp}/>
    </Col>
  </Row>
</Container>
    )}
}

export default HomePage;