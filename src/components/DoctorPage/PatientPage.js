import React from 'react'
import { Container, Navbar, Nav, Col,Row } from 'react-bootstrap'
import  DynamicComponent from './DynamicDoc'

class PatientPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isClose:true,
            comp:'blank'
        }
        this.clicked = this.clicked.bind(this);
    }

    clicked(path){
        const { comp, isClose } = this.state;
          if(comp != path){
            this.setState({isClose:true})
            this.setState({comp:path})
          }else{
          this.setState({comp:path})
          this.setState({isClose:!isClose})
        }
      }

    componentWillReceiveProps(){
        const {isClose,comp} = this.state;
        this.setState({isClose:true})
    }
    componentWillUnmount(){
        this.setState({comp:'blank'})
    }

    render(){
        const {isClose} = this.state;
        console.log(this.state.isClose)
        console.log(this.state.comp)
        return(
        <Container >
            {this.props.name, isClose &&
            <Row>
            <Col>
                <Navbar className="navbar navbar-default" bg="dark" variant="dark" fixed="top">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link variant='info' onClick={()=> this.setState({isClose:false})}  href="#"
                            >返回</Nav.Link>
                            </Nav.Item>
                        <Nav.Link href="#consultations#" onClick={()=>this.setState({comp:'consultation'})}>诊断书</Nav.Link>
                        <Nav.Link href="#tests#" onClick={()=>this.setState({comp:'test'})}>检查</Nav.Link>
                    </Nav>
                    <Navbar.Brand inline variant="outline-info" className="mr-10">{this.props.name}{' < '}{this.props.creator}</Navbar.Brand>
                </Navbar>
            </Col>
            </Row>
        }
        {   isClose
            ? <DynamicComponent comp={this.state.comp} name={this.props.name} creator={this.props.creator}/>
            : <DynamicComponent comp={'blank'} name={this.props.name} creator={this.props.creator}/>
        }
        </Container>  
    )}
}

export default PatientPage;