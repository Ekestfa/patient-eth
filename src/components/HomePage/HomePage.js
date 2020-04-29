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
  localStorage.removeItem('p');
}

return(

<Container>
  <Row>
    <Col>
    <Navbar className="navbar navbar-default" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#" onClick={()=> changeComp('blank')}>Home</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#consultations" onClick={()=> changeComp('consultation')}>诊断书</Nav.Link>
                <Nav.Link href="#medicines" onClick={()=> changeComp('medicine')}>药</Nav.Link>
                <Nav.Link href="#tests" onClick={()=> changeComp('testpage')}>检查</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" fixed="center" />
                <Button variant="outline-info">Search</Button>
            </Form>
            <label>{localStorage.getItem("p")}</label>
            <Button variant="outline-info" onClick={logout}>退出</Button>
        </Navbar>
    </Col>
  </Row>
  <Row>
    {/* <Col sm={2}>sm=2</Col> */}
    <Col lg={12}>
      <DynamicComponent comp={comp}/>
    </Col>
  </Row>
</Container>
    )
}

export default HomePage;