import React, { useState } from 'react';
import {Nav, Form, FormControl, Button, Navbar, Container, Row, Col} from 'react-bootstrap';
import auth from '../../helpers/auth'
import DynamicComponent from "./Dynamic";

const HomePage = (props) => {
const [comp, changeComp] = useState('blank');

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
                <Nav.Link href="#counsultations" onClick={()=> changeComp('consultation')}>诊断书</Nav.Link>
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
    <DynamicComponent comp={comp}/>
    {/* <Consultation/> */}
    </Col>
  </Row>
</Container>
    )
}

export default HomePage;