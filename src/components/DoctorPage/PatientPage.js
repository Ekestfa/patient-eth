import React from 'react'
import { Container, Navbar, Nav, Col, Form, Button, FormControl,Row } from 'react-bootstrap'
import  DynamicComponent from './DynamicDoc'

class PatientPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicked:'',
            comp:'blank'
        }
    }

    render(){
        const {clicked} = this.state;
        return(
        <Container >
            {this.props.name &&
            <Row>
            <Col>
                <Navbar className="navbar navbar-default" bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="#consultations" onClick={()=>this.setState({comp:'consultation'})}>诊断书</Nav.Link>
                    <Nav.Link href="#medicines" >药</Nav.Link>
                    <Nav.Link href="#tests" onClick={()=>this.setState({comp:'test'})}>检查</Nav.Link>
                    <Navbar.Brand inline variant="outline-info" className="mr-10">{this.props.name}</Navbar.Brand>
                </Nav>
                </Navbar>
            </Col>
            </Row>
        }
        <DynamicComponent comp={this.state.comp} name={this.props.name} creator={this.props.creator}/>
        </Container>
        
    )}
}

export default PatientPage;