import React, { useState } from 'react';
import {Nav, Form, FormControl, Button, Navbar, Container, Row, Col} from 'react-bootstrap';
import Consultation from '../Consultation/Consultation';
import auth from '../../helpers/auth'
import ActionLink from './ActionLink'


const HomePage = (props) => {
const {handleClick} = ActionLink()

function logout(){
  auth.logout(()=>{
    props.history.push('/');
  });
  localStorage.removeItem('userlogined');
}

return(

<Container>
  <Row>
    <Col>
    <Navbar className="navbar navbar-default" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#counsultations" onClick={handleClick}>诊断书</Nav.Link>
                <Nav.Link href="#medicines">药</Nav.Link>
                <Nav.Link href="#tests">检查</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" fixed="center" />
                <Button variant="outline-info">Search</Button>
            </Form>
            <label>{localStorage.getItem("userlogined")}</label>
            <Button variant="outline-info" onClick={logout}>退出</Button>
        </Navbar>
    </Col>
  </Row>
  <Row>
    <Col sm={2}>sm=2</Col>
    <Col sm={10}>

    <Consultation/>
    </Col>
  </Row>
</Container>
    )
}

export default HomePage;