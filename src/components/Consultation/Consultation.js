import React, {useState} from 'react';
import {Nav,Container,Row,Col} from 'react-bootstrap';
import DynamicComponent from './DynamicCons'


const Consultation = (props) => {

// Change components' state
const [comp, changeComp] = useState('Blank');

    return (
    <Container>
        <Row>
        <Nav  bg="dark" variant="dark" >
            <Nav.Item>
                <Nav.Link onClick={()=> changeComp('CreateNewConsulComponent')} href="#consultations#new"
                    name={props.name}>新建</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=> changeComp('ConsulList')} href="#consultations#list"
                    name={props.name}>列出历史</Nav.Link>
            </Nav.Item>
            </Nav>
            
        </Row>
        <Row>
            <Col sm={12}>
                <DynamicComponent comp={comp}/>
            </Col>
        </Row>
    </Container>
    );
}
export default Consultation;