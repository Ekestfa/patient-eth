import React from 'react';
import {Nav,Container,Row,Col, Navbar} from 'react-bootstrap';
import DynamicComponent from './DynamicCons'


class Consultation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comp:'Blank',
            close:true,
            patientname:''
        }
    }
componentDidMount(){
    const {patientname} = this.state;
    // const {name} = this.props;
    var pname = localStorage.getItem('p');
    if(pname===null){
        pname = this.props.name
    }
    this.setState({patientname:pname})
}

render(){
    const {comp, close, patientname} = this.state;
    const {creator} = this.props;

    return (
        <Container fixed="top">
        { close && 
        <Row>
        <Col>
        <Navbar className="navbar" bg="dark" variant="dark" fixed="top" style={{   height: '50px' }}>
        <Nav className="justify-content-center mr-auto" fixed="top" bg="light" variant="light" >
            <Nav.Item>
                <Nav.Link onClick={()=> this.setState({close:false})}  href="#"
                    >返回</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=> this.setState({comp:'CreateNewConsulComponent'})} href="#consultations#new"
                    >新建</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=> this.setState({comp:'ConsulList'})} href="#consultations#list"
                    >列出历史</Nav.Link>
            </Nav.Item>
            </Nav>
                  <Navbar.Brand> {patientname}的诊断书{this.props.creator!=null && <>{ ' < ' + creator}</>} </Navbar.Brand>
            </Navbar>
        </Col>
        </Row>
        }{ close 
            ?<DynamicComponent comp={comp} name={this.props.name} creator={this.props.creator}/>
            :<DynamicComponent comp='Blank' name={this.props.name} creator={this.props.creator}/>
           }
    </Container>
        );
    }
}
export default Consultation;