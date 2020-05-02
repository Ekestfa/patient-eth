import React from 'react';
import {Nav,Container,Row,Col} from 'react-bootstrap';
import DynamicComponent from './DynamicCons'


class Consultation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comp:'Blank'
        }
    }
// Change components' state

componentDidUpdate(){
    const {searchtype, searchtext} = this.state;
    console.log(searchtype, searchtext)
}

render(){
    const {comp} = this.state;

    return (
        <Container className>
            <Row>
            <Nav className="justify-content-center" fixed="top" bg="dark" variant="dark" >
                <Nav.Item>
                    <Nav.Link onClick={()=> this.setState({comp:'CreateNewConsulComponent'})} href="#consultations#new"
                        >新建</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=> this.setState({comp:'ConsulList'})} href="#consultations#list"
                        >列出历史</Nav.Link>
                </Nav.Item>
                </Nav>
            </Row>
            <Row>
                <Col sm={12}>
                    <DynamicComponent comp={comp} name={this.props.name} creator={this.props.creator}/>
                </Col>
            </Row>
        </Container>
        );
    }
}
export default Consultation;