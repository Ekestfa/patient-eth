import React, {useState} from 'react';
import {Nav,Container,Row,Col,Navbar} from 'react-bootstrap';
import DynamicComponent from './DynamicCons'


const Consultation = (props) => {
// Change components' state
const [comp, changeComp] = useState('Blank');

    return (
    <Container className>
        <Row>
         <Nav className="justify-content-center" fixed="top" bg="dark" variant="dark" >
            <Nav.Item>
                <Nav.Link onClick={()=> changeComp('CreateNewConsulComponent')} href="#consultations#new"
                    >新建</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=> changeComp('ConsulList')} href="#consultations#list"
                    >列出历史</Nav.Link>
            </Nav.Item>
            </Nav>
        </Row>
        <Row>
            <Col sm={12}>
                <DynamicComponent comp={comp} name={props.name} creator={props.creator}/>
            </Col>
        </Row>
    </Container>
    );
}
export default Consultation;