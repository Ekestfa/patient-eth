import React from 'react'
import { Container, Navbar, Nav, Col, Form, Button, FormControl,Row } from 'react-bootstrap'
import Consultation from '../Consultation/Consultation'
import TestPage from '../TestPage/TestPage'

class PatientPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicked:''
        }
    }

    render(){
        const {clicked} = this.state;
        return(
        <Container >
            {this.props.name&&
            <Row>
            <Col>
                <Navbar className="navbar navbar-default" bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="#consultations">诊断书</Nav.Link>
                    <Nav.Link href="#medicines" >药</Nav.Link>
                    <Nav.Link href="#tests" >检查</Nav.Link>
                    <label>{this.props.name}</label>
                </Nav>
                </Navbar>
            </Col>
            </Row>
        }
        
        <Consultation/>
        <TestPage/>
        
        </Container>
        
    )}
}

export default PatientPage;