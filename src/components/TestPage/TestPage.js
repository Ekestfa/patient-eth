import React, {useState} from 'react';
import {Nav,Container,Row,Col} from 'react-bootstrap';
import DynamicComponent from './DynamicTest'


const TestPage = (props) => {

// Change components' state
const [comp, changeComp] = useState('blanktest');

    return (
    <Container>
        <Row>
        <Nav  bg="dark" variant="dark" >
            <Nav.Item>
                <Nav.Link onClick={()=> changeComp('newtest')} href="#tests#new">新建</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=> changeComp('testlist')} href="#tests#list">列出历史</Nav.Link>
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
export default TestPage;